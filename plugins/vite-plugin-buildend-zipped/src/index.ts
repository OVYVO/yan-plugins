import fs from "fs";
import path from "path";
import archiver from "archiver";
import { createGzip } from "zlib";
import OSS from "ali-oss";

const uploadToOSS = (ossSavePath: string, originPaths: string[] = []) => {
  return new Promise<void>(async (resolve, reject) => {
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
      if (!originPaths.length)
        return console.log("🚨 无上传文件，请确认文件是否存在");
      for (const i of originPaths) {
        const targetFileName = `${ossSavePath}${path.basename(i)}`;
        try {
          await client.head(targetFileName);
          await client.delete(targetFileName);
        } catch (err) {
          if (err.code !== "NoSuchKey") throw err;
        }
        const res = await client.put(targetFileName, i);
        console.log(`📤 文件已成功上传，下载地址：${res.url}`);
      }
      resolve();
    } catch (err) {
      console.log("🚨 OSS上传失败", err);
      reject();
    }
  });
};
export const buildEndZipped = ({
  needUpload = true,
  project_shortname = "pmg",
  target_oss_object = "jg-web-test/main-server",
} = {}) => {
  let webStaticFilePath: string;
  let appStaticFilePath: string;
  let mode;
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
        if (!project_shortname)
          return console.log("🚨 请填写项目名称简写，例如：pmg");
        if (!target_oss_object)
          return console.log(
            "🚨 请填写AliOSS存储对象，例如：jg-web-test/main-server"
          );
        const packageJsonPath = path.resolve(process.cwd(), "package.json");
        if (!fs.existsSync(packageJsonPath)) return;
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf-8")
        );
        const pkgPath = path.resolve(
          process.cwd(),
          "dist",
          `${packageJson.version}`
        );
        const webPath = path.resolve(
          pkgPath,
          `${project_shortname}-frontend-${packageJson.version}.tar.gz`
        );
        const appPath = path.resolve(
          pkgPath,
          `${project_shortname}-app-${packageJson.version}.tar.gz`
        );
        if (fs.existsSync(pkgPath))
          fs.rmSync(pkgPath, { recursive: true, force: true });
        fs.mkdirSync(pkgPath, { recursive: true });
        console.log(`📁 成功创建产物目录：${pkgPath}`);
        console.log(`🚚 开始构建产物压缩包`);
        for (const item of [webPath, appPath]) {
          const archive = archiver("tar", { zlib: { level: 9 } });
          const gzip = createGzip();
          const output = fs.createWriteStream(item);
          archive.pipe(gzip).pipe(output);
          if (item === webPath && fs.existsSync(webStaticFilePath)) {
            archive.directory(webStaticFilePath, false);
          } else if (item === appPath && fs.existsSync(appStaticFilePath)) {
            archive.directory(appStaticFilePath, false);
          }
          await archive.finalize();
        }
        console.log(
          `👽️ 压缩包构建完成${needUpload ? "，准备上传阿里云OSS" : ""}`
        );
        if (!needUpload) return;
        const ossSavePath = `${target_oss_object}/${packageJson.version}/`;
        await uploadToOSS(ossSavePath, [webPath, appPath]);
        console.log(`🚀 文件已全部上传`);
      },
    },
  };
};
