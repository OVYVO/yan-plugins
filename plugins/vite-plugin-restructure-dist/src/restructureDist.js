import fs from "fs"
import path from "path"

export default function restructureDist() {
  let mode
  let outDir
  let configDir
  return {
    name: "vite-plugin-restructure-dist",
    enforce: "post",
    configResolved(viteConfig) {
      outDir = path.resolve(viteConfig.build.outDir)
      configDir = path.join(outDir, "config")
      mode = viteConfig.mode
    },
    closeBundle: {
      handler: async () => {
        if (mode !== "online") return
        try {
          const webDir = path.join(outDir, "web")
          const newConfigDir = path.join(outDir, "config")
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true })
          }
          if (fs.existsSync(configDir) && configDir !== newConfigDir) {
            if (fs.existsSync(newConfigDir)) {
              fs.rmSync(newConfigDir, { recursive: true, force: true })
            }
            fs.renameSync(configDir, newConfigDir)
          }
          const items = fs.readdirSync(outDir)
          for (const item of items) {
            if (item === "config" || item === "frontend" || item === "appImage") {
              continue
            }
            const oldPath = path.join(outDir, item)
            const newPath = path.join(webDir, item)
            if (!fs.existsSync(webDir)) {
              fs.mkdirSync(webDir, { recursive: true })
            }
            fs.renameSync(oldPath, newPath)
          }
        } catch (error) {
          console.error(`error during dist restructure:`, error)
          throw error
        }
      }
    }
  }
}
