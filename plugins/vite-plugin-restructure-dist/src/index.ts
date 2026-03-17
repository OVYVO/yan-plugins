import fs from "fs"
import path from "path"
import type { Plugin, ResolvedConfig } from "vite"

export default function restructureDistPlugin(): Plugin {
  let mode: string = ""
  let outDir: string = ""
  let configDir: string = ""

  async function restructureOutputDirectory(): Promise<void> {
    const webDir: string = path.join(outDir, "web")
    const newConfigDir: string = path.join(outDir, "config")
    ensureDirectoryExists(outDir)
    await handleConfigDirectory(configDir, newConfigDir)
    ensureDirectoryExists(webDir)
    await moveFilesToWebDir(outDir, webDir)
  }
  function ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }
  async function handleConfigDirectory(sourceDir: string, targetDir: string): Promise<void> {
    if (fs.existsSync(sourceDir) && sourceDir !== targetDir) {
      if (fs.existsSync(targetDir)) {
        fs.rmSync(targetDir, { recursive: true, force: true })
      }
      fs.renameSync(sourceDir, targetDir)
    }
  }
  async function moveFilesToWebDir(sourceDir: string, targetDir: string): Promise<void> {
    const preservedDirs: string[] = ["config", "frontend", "appImage"]
    const items: string[] = fs.readdirSync(sourceDir)
    for (const item of items) {
      if (preservedDirs.includes(item)) {
        continue
      }
      const oldPath: string = path.join(sourceDir, item)
      const newPath: string = path.join(targetDir, item)
      fs.renameSync(oldPath, newPath)
    }
  }

  return {
    name: "vite-plugin-restructure-dist",
    enforce: "post",
    configResolved(viteConfig: ResolvedConfig): void {
      outDir = path.resolve(viteConfig.build.outDir)
      configDir = path.join(outDir, "config")
      mode = viteConfig.mode
    },
    closeBundle: {
      handler: async (): Promise<void> => {
        if (mode !== "online") {
          return
        }
        try {
          await restructureOutputDirectory()
        } catch (error) {
          console.error(`[vite-plugin-restructure-dist] error during dist restructure:`, error)
          throw error
        }
      }
    }
  }
}
