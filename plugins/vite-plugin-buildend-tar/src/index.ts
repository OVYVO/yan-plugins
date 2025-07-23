import fs from "fs";
import path from "path";
import archiver from "archiver";
import { createGzip } from "zlib";

const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}${hours}${minutes}`;
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
          `PMG_V${packageJson.version}-${formatTime(new Date())}.tar.gz`
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
        console.log(`🚀 构建产物已打包，任务结束!`);
      },
    },
  };
};

export default buildEndTar;
