import fs from "fs";
import path from "path";

const EXCLUDE_FIELDS = ["scripts", "private", "type", "husky", "lintStaged"];
const FILE_EXTENSIONS = [".json"];

// 定义插件配置选项的类型
interface PluginOptions {
  fields?: string[];
  fileName?: string;
  customFields?: Record<string, any>;
}

// 定义 vite 插件返回的对象结构
interface VitePlugin {
  name: string;
  apply: "build";
  configResolved: (viteConfig: any) => void;
  closeBundle: () => void;
}

export default function pkginfo2dist({
  fields = ["version", "name"],
  fileName = "pkg_info.json",
  customFields = {},
}: PluginOptions = {}): VitePlugin {
  let outDir: string;
  let mode: string;
  let filename = "pkg_info.json";

  return {
    name: "vite-plugin-pkginfo2dist",
    apply: "build",
    configResolved(viteConfig) {
      outDir = path.resolve(viteConfig.build.outDir);
      mode = viteConfig.mode;
    },
    closeBundle() {
      if (mode !== "electron") return;
      if (fileName) {
        const ext = path.extname(fileName).toLowerCase();
        if (FILE_EXTENSIONS.includes(ext)) {
          filename = fileName;
        } else {
          console.warn(
            `Invalid file extension for fileName: ${fileName}. Only .json is allowed. Using default: pkg_info.json`
          );
        }
      }
      const packageJsonPath = path.resolve(process.cwd(), "package.json");
      if (!fs.existsSync(packageJsonPath)) return;
      const packageJsonContent = JSON.parse(
        fs.readFileSync(packageJsonPath, "utf-8")
      );
      let info: Record<string, any> = {};
      if (fields && Array.isArray(fields)) {
        fields.forEach((field) => {
          if (
            packageJsonContent.hasOwnProperty(field) &&
            !EXCLUDE_FIELDS.includes(field)
          ) {
            info[field] = packageJsonContent[field];
          }
        });
        info = { ...info, ...customFields };
      } else {
        Object.keys(packageJsonContent).forEach((key) => {
          if (!EXCLUDE_FIELDS.includes(key)) {
            info[key] = packageJsonContent[key];
          }
        });
        info = { ...info, ...customFields };
      }
      fs.writeFileSync(
        path.join(outDir, filename),
        JSON.stringify(info, null, 2)
      );
    },
  };
}
