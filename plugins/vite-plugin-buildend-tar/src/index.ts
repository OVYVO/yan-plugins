import fs from "fs";
import path from "path";
import archiver from "archiver";
import { createGzip } from "zlib";
import OSS from "ali-oss";
import dayjs from "dayjs";

const uploadToOSS = async (fileName: string, filePath: string) => {
  const client = new OSS({
    region: "oss-cn-beijing",
    accessKeyId: "your-accessKeyId",
    accessKeySecret: "your-accessKeySecret",
    bucket: "your-bucket-name",
  });
  try {
    const result = await client.put(fileName, filePath);
    return result.url;
  } catch (err) {
    console.error(`Upload failed:`, err);
    throw err;
  }
};
const buildEndTar = () => {
  let webStaticFilePath: string;
  let electronStaticFilePath: string;
  let mode: string;

  return {
    name: "vite-plugin-buildend-tar",
    apply: "build",
    configResolved(viteConfig: any) {
      webStaticFilePath = path.resolve(viteConfig.build.outDir);
      electronStaticFilePath = path.resolve(process.cwd(), "dist/appImage");
      mode = viteConfig.mode;
    },
    closeBundle: {
      sequential: true,
      order: "post",
      handler: async () => {
        if (mode !== "prod") return;
        const packageJsonPath = path.resolve(process.cwd(), "package.json");
        if (!fs.existsSync(packageJsonPath)) return;
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf-8")
        );
        const zipFilePath = path.resolve(
          process.cwd(),
          "dist",
          `PMG_V${packageJson.version}-${dayjs().format("YYYYMMDDHHmm")}.tar.gz`
        );
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver("tar", {
          zlib: { level: 9 },
        });
        const gzip = createGzip();
        archive.pipe(output);
        archive.pipe(gzip);
        archive.directory(webStaticFilePath, "web");
        archive.directory(electronStaticFilePath, "app");
        await archive.finalize();
        console.log(`🚀 构建产物打包完成，准备上传阿里云OSS...`);
        const ossFileName = `${path.basename(zipFilePath)}`;
        const fileUrl = await uploadToOSS(zipFilePath, ossFileName);
        console.log(`🚀 文件已上传至阿里云OSS，访问地址: ${fileUrl}`);
      },
    },
  };
};

export default buildEndTar;
