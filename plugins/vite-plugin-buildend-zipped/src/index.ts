import fs from "fs";
import path from "path";
import archiver from "archiver";
import { createGzip } from "zlib";
import OSS from "ali-oss";
import dayjs from "dayjs";

const uploadToOSS = (fileName: string, filePath: string) => {
  return new Promise(async (resolve, reject) => {
    const accessKeyId = process.env.OSS_ACCESS_KEY_ID || "";
    const accessKeySecret = process.env.OSS_ACCESS_KEY_SECRET || "";
    if (!accessKeyId || !accessKeySecret) {
      console.log("🚨 未读取到OSS_ACCESS_KEY_ID或OSS_ACCESS_KEY_SECRET配置");
      reject();
    }
    const client = new OSS({
      region: "oss-cn-shanghai",
      accessKeyId,
      accessKeySecret,
      bucket: "jg-deliver",
      authorizationV4: true,
    } as OSS.Options);
    try {
      const result = await client.put(fileName, filePath);
      resolve(result.url);
    } catch (err) {
      console.log("🚨 OSS上传失败", err);
      reject();
    }
  });
};
const buildEndZipped = ({
  needUpload = true,
  target_oss_object = "jg-web-test",
} = {}) => {
  let webStaticFilePath: string;
  let appStaticFilePath: string;
  let mode: string;
  return {
    name: "vite-plugin-buildend-zipped",
    apply: "build",
    configResolved(viteConfig: any) {
      webStaticFilePath = path.resolve(viteConfig.build.outDir);
      appStaticFilePath = path.resolve(process.cwd(), "dist/appImage");
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
        archive.pipe(gzip).pipe(output);
        archive.directory(webStaticFilePath, "web");
        archive.directory(appStaticFilePath, "app");
        console.log();
        console.log(`🚚 开始构建产物压缩包...`);
        await archive.finalize();
        console.log(
          `👽️ 构建产物压缩包完成${needUpload ? "，准备上传阿里云OSS..." : ""}`
        );
        if (!needUpload) return;
        const ossFileName = `${target_oss_object}/${path.basename(
          zipFilePath
        )}`;
        const fileUrl = await uploadToOSS(ossFileName, zipFilePath);
        console.log(`🚀 文件已上传至阿里云OSS，访问地址: ${fileUrl}`);
      },
    },
  };
};

export default buildEndZipped;
