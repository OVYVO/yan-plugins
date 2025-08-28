import fs from "fs"
import path from "path"
import archiver from "archiver"
import { createGzip } from "zlib"
import OSS from "ali-oss"

const uploadToOSS = (ossSavePath, originPaths = []) => {
  return new Promise(async (resolve, reject) => {
    const accessKeyId = process.env.OSS_ACCESS_KEY_ID || ""
    const accessKeySecret = process.env.OSS_ACCESS_KEY_SECRET || ""
    if (!accessKeyId || !accessKeySecret) {
      console.log("🚨 未读取到OSS_ACCESS_KEY_ID或OSS_ACCESS_KEY_SECRET配置")
      reject()
    }
    const client = new OSS({
      region: "oss-cn-shanghai",
      accessKeyId,
      accessKeySecret,
      bucket: "jg-deliver",
      authorizationV4: true
    })
    try {
      if (!originPaths.length) return console.log("🚨 无上传文件，请确认文件是否存在")
      for (const i of originPaths) {
        const targetFileName = `${ossSavePath}${path.basename(i)}`
        try {
          await client.head(targetFileName)
          await client.delete(targetFileName)
        } catch (err) {
          if (err.code !== "NoSuchKey") throw err
        }
        const res = await client.put(targetFileName, i)
        console.log(`📤 文件已成功上传，下载地址：${res.url}`)
      }
      resolve()
    } catch (err) {
      console.log("🚨 OSS上传失败", err)
      reject()
    }
  })
}
export default function buildEndZipped({ needUpload = true, proShortName = "", targetOssObject = "" } = {}) {
  let webStaticFilePath
  let appStaticFilePath
  let mode
  return {
    name: "vite-plugin-buildend-zipped",
    apply: "build",
    configResolved(viteConfig) {
      webStaticFilePath = path.resolve(viteConfig.build.outDir)
      appStaticFilePath = path.resolve(process.cwd(), "dist/appImage")
      mode = viteConfig.mode
    },
    closeBundle: {
      sequential: true,
      order: "post",
      handler: async () => {
        if (mode !== "online") return
        if (!proShortName) return console.log("🚨 请填写项目名称简写，例如：pmg")
        if (!targetOssObject) return console.log("🚨 请填写AliOSS存储对象，例如：jg-web-test/main-server")
        const packageJsonPath = path.resolve(process.cwd(), "package.json")
        if (!fs.existsSync(packageJsonPath)) return
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))
        const webPathBaseName = `${proShortName}-frontend-${packageJson.version}`
        const appX86PathBaseName = `${proShortName}-app-${packageJson.version}-x86_64`
        const appArmPathBaseName = `${proShortName}-app-${packageJson.version}-arm64`
        const pkgPath = path.resolve(process.cwd(), "dist", `${packageJson.version}`)
        const webPath = path.resolve(pkgPath, `${webPathBaseName}.tar.gz`)
        const appX86Path = path.resolve(pkgPath, `${appX86PathBaseName}.tar.gz`)
        const appArmPath = path.resolve(pkgPath, `${appArmPathBaseName}.tar.gz`)
        if (fs.existsSync(pkgPath)) fs.rmSync(pkgPath, { recursive: true, force: true })
        fs.mkdirSync(pkgPath, { recursive: true })
        console.log(`📁 成功创建产物目录：${pkgPath}`)
        console.log(`🚚 开始构建产物压缩包`)
        const isMac = process.platform === "darwin"
        const macIgnore = isMac ? ["**/.DS_Store", "**/.AppleDouble", "**/__MACOSX/**"] : []
        for (const item of [webPath, appX86Path, appArmPath]) {
          const archive = archiver("tar", { zlib: { level: 9 } })
          const gzip = createGzip()
          const output = fs.createWriteStream(item)
          archive.pipe(gzip).pipe(output)
          if (item === webPath && fs.existsSync(webStaticFilePath)) {
            archive.glob("**/*", { cwd: webStaticFilePath, ignore: macIgnore }, { prefix: `${webPathBaseName}` })
          } else if (item === appX86Path && fs.existsSync(appStaticFilePath)) {
            archive.glob("**/*x86_64*", { cwd: appStaticFilePath, ignore: macIgnore }, { prefix: appX86PathBaseName })
          } else if (item === appArmPath && fs.existsSync(appStaticFilePath)) {
            archive.glob("**/*arm64*", { cwd: appStaticFilePath, ignore: macIgnore }, { prefix: appArmPathBaseName })
          }
          await archive.finalize()
        }
        console.log(`👽️ 压缩包构建完成${needUpload ? "，准备上传阿里云OSS" : ""}`)
        if (!needUpload) return
        const ossSavePath = `${targetOssObject}/${packageJson.version}/`
        await uploadToOSS(ossSavePath, [webPath, appX86Path, appArmPath])
        console.log(`🚀 文件已全部上传`)
      }
    }
  }
}
