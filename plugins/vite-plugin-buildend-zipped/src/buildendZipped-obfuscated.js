;(function (_0x5bfed2, _0x3a0242) {
  const _0x4a656a = a0_0x2c9f,
    _0x5cee2e = _0x5bfed2()
  while (!![]) {
    try {
      const _0x4d995 =
        (parseInt(_0x4a656a(0x1fe)) / 0x1) * (parseInt(_0x4a656a(0x1f0)) / 0x2) +
        -parseInt(_0x4a656a(0x209)) / 0x3 +
        -parseInt(_0x4a656a(0x1f8)) / 0x4 +
        -parseInt(_0x4a656a(0x1db)) / 0x5 +
        parseInt(_0x4a656a(0x1e2)) / 0x6 +
        (parseInt(_0x4a656a(0x1de)) / 0x7) * (parseInt(_0x4a656a(0x1fb)) / 0x8) +
        (parseInt(_0x4a656a(0x1ee)) / 0x9) * (parseInt(_0x4a656a(0x1f6)) / 0xa)
      if (_0x4d995 === _0x3a0242) break
      else _0x5cee2e["push"](_0x5cee2e["shift"]())
    } catch (_0x3b529d) {
      _0x5cee2e["push"](_0x5cee2e["shift"]())
    }
  }
})(a0_0x5a6d, 0x1e4c1)
import a0_0x57416b from "fs"
import a0_0x33bfaf from "path"
function a0_0x2c9f(_0xc532f9, _0x764894) {
  const _0x5a6d40 = a0_0x5a6d()
  return (
    (a0_0x2c9f = function (_0x2c9fbb, _0x3a9be9) {
      _0x2c9fbb = _0x2c9fbb - 0x1d1
      let _0x8acce9 = _0x5a6d40[_0x2c9fbb]
      return _0x8acce9
    }),
    a0_0x2c9f(_0xc532f9, _0x764894)
  )
}
import a0_0x518d56 from "archiver"
function a0_0x5a6d() {
  const _0x45ec5c = [
    "👽️\x20压缩包构建完成",
    "NoSuchKey",
    "**/*",
    "basename",
    "jg-deliver",
    "dist/appImage",
    "🚚\x20开始构建产物压缩包",
    "resolve",
    "renameSync",
    "build",
    "oss-cn-shanghai",
    "utf-8",
    "1146725GUDnAF",
    "mkdirSync",
    "existsSync",
    "28vjRQJA",
    "🚨\x20未读取到OSS_ACCESS_KEY_ID或OSS_ACCESS_KEY_SECRET配置",
    ".tar.gz",
    "env",
    "1240200LxdLdg",
    "url",
    "📤\x20文件已成功上传，下载地址：",
    "rmSync",
    "version",
    "dist",
    "online",
    "🚨\x20无上传文件，请确认文件是否存在",
    "，准备上传阿里云OSS",
    "OSS_ACCESS_KEY_SECRET",
    "post",
    "🚀\x20文件已全部上传",
    "5085cVYXiK",
    "outDir",
    "4906QGOujM",
    "📁\x20成功创建产物目录：",
    "glob",
    "pipe",
    "parse",
    "mode",
    "2480gZZKKZ",
    "head",
    "437920sBzUvI",
    "cwd",
    "log",
    "495664Caccgc",
    "createWriteStream",
    "-frontend-",
    "22kzsKEz",
    "**/.DS_Store",
    "**/.AppleDouble",
    "package.json",
    "-x86_64",
    "-app-",
    "length",
    "🚨\x20请填写项目名称简写，例如：pmg",
    "code",
    "**/__MACOSX/**",
    "tar",
    "557088pERQjo"
  ]
  a0_0x5a6d = function () {
    return _0x45ec5c
  }
  return a0_0x5a6d()
}
import { createGzip } from "zlib"
import a0_0x3f1ca1 from "ali-oss"
const uploadToOSS = (_0x54a729, _0x1f2452 = []) => {
  return new Promise(async (_0x172039, _0x5e55b5) => {
    const _0x368a9f = a0_0x2c9f,
      _0x25d7b1 = process["env"]["OSS_ACCESS_KEY_ID"] || "",
      _0x3539e3 = process[_0x368a9f(0x1e1)][_0x368a9f(0x1eb)] || ""
    ;(!_0x25d7b1 || !_0x3539e3) && (console[_0x368a9f(0x1fa)](_0x368a9f(0x1df)), _0x5e55b5())
    const _0x25c319 = new a0_0x3f1ca1({
      region: _0x368a9f(0x1d9),
      accessKeyId: _0x25d7b1,
      accessKeySecret: _0x3539e3,
      bucket: _0x368a9f(0x1d3),
      authorizationV4: !![]
    })
    try {
      if (!_0x1f2452[_0x368a9f(0x204)]) return console[_0x368a9f(0x1fa)](_0x368a9f(0x1e9))
      for (const _0x4a59d7 of _0x1f2452) {
        const _0x595f5b = "" + _0x54a729 + a0_0x33bfaf[_0x368a9f(0x1d2)](_0x4a59d7)
        try {
          await _0x25c319[_0x368a9f(0x1f7)](_0x595f5b), await _0x25c319["delete"](_0x595f5b)
        } catch (_0x41d268) {
          if (_0x41d268[_0x368a9f(0x206)] !== _0x368a9f(0x20b)) throw _0x41d268
        }
        const _0x9f919c = await _0x25c319["put"](_0x595f5b, _0x4a59d7)
        console[_0x368a9f(0x1fa)](_0x368a9f(0x1e4) + _0x9f919c[_0x368a9f(0x1e3)])
      }
      _0x172039()
    } catch (_0xb65cf3) {
      console["log"]("🚨\x20OSS上传失败", _0xb65cf3), _0x5e55b5()
    }
  })
}
export default function buildEndZipped({
  needUpload: needUpload = !![],
  needBuildElectron: needBuildElectron = !![],
  proShortName: proShortName = "",
  targetOssObject: targetOssObject = ""
} = {}) {
  const _0x3c4fbd = a0_0x2c9f
  let _0x263c40, _0x6676a0, _0x2c89e0, _0x2ce445
  return {
    name: "vite-plugin-buildend-zipped",
    apply: _0x3c4fbd(0x1d8),
    configResolved(_0x22e8d7) {
      const _0x377941 = _0x3c4fbd
      ;(_0x263c40 = a0_0x33bfaf[_0x377941(0x1d6)](_0x22e8d7[_0x377941(0x1d8)][_0x377941(0x1ef)])),
        (_0x6676a0 = a0_0x33bfaf[_0x377941(0x1d6)](process[_0x377941(0x1f9)](), _0x377941(0x1d4))),
        (_0x2c89e0 = a0_0x33bfaf[_0x377941(0x1d6)](process[_0x377941(0x1f9)](), _0x377941(0x201))),
        (_0x2ce445 = _0x22e8d7[_0x377941(0x1f5)])
    },
    writeBundle() {
      const _0x36d341 = _0x3c4fbd
      if (_0x2ce445 !== _0x36d341(0x1e8)) return
      const _0xde8492 = a0_0x57416b["readdirSync"](_0x263c40),
        _0x288c0 = a0_0x33bfaf[_0x36d341(0x1d6)](_0x263c40, _0x36d341(0x1e7))
      if (!a0_0x57416b[_0x36d341(0x1dd)](_0x288c0)) a0_0x57416b[_0x36d341(0x1dc)](_0x288c0, { recursive: !![] })
      for (const _0x3879ce of _0xde8492) {
        if (_0x3879ce === "config" || _0x3879ce === _0x36d341(0x1e7)) continue
        const _0x486bd6 = a0_0x33bfaf["resolve"](_0x263c40, _0x3879ce),
          _0x248f7c = a0_0x33bfaf[_0x36d341(0x1d6)](_0x288c0, _0x3879ce)
        a0_0x57416b[_0x36d341(0x1d7)](_0x486bd6, _0x248f7c)
      }
    },
    closeBundle: {
      sequential: !![],
      order: _0x3c4fbd(0x1ec),
      handler: async () => {
        const _0x53eb69 = _0x3c4fbd
        if (_0x2ce445 !== "online") return
        if (!proShortName) return console[_0x53eb69(0x1fa)](_0x53eb69(0x205))
        if (!targetOssObject) return console[_0x53eb69(0x1fa)]("🚨\x20请填写AliOSS存储对象，例如：pmg/main-server")
        if (!a0_0x57416b[_0x53eb69(0x1dd)](_0x2c89e0)) return
        if (!a0_0x57416b[_0x53eb69(0x1dd)](_0x263c40)) return
        if (!a0_0x57416b["existsSync"](_0x6676a0) && needBuildElectron) return
        const _0xbf5d9e = JSON[_0x53eb69(0x1f4)](a0_0x57416b["readFileSync"](_0x2c89e0, _0x53eb69(0x1da)))[
            _0x53eb69(0x1e6)
          ],
          _0x3e05c1 = a0_0x33bfaf[_0x53eb69(0x1d6)](process["cwd"](), "dist", "" + _0xbf5d9e)
        if (a0_0x57416b["existsSync"](_0x3e05c1))
          a0_0x57416b[_0x53eb69(0x1e5)](_0x3e05c1, { recursive: !![], force: !![] })
        a0_0x57416b[_0x53eb69(0x1dc)](_0x3e05c1, { recursive: !![] }), console["log"](_0x53eb69(0x1f1) + _0x3e05c1)
        const _0x401dbc = proShortName + _0x53eb69(0x1fd) + _0xbf5d9e,
          _0x449a54 = proShortName + _0x53eb69(0x203) + _0xbf5d9e + _0x53eb69(0x202),
          _0x14906a = proShortName + _0x53eb69(0x203) + _0xbf5d9e + "-arm64",
          _0x8999d1 = a0_0x33bfaf[_0x53eb69(0x1d6)](_0x3e05c1, _0x401dbc + ".tar.gz"),
          _0x247e31 = a0_0x33bfaf["resolve"](_0x3e05c1, _0x449a54 + _0x53eb69(0x1e0)),
          _0x15a486 = a0_0x33bfaf[_0x53eb69(0x1d6)](_0x3e05c1, _0x14906a + _0x53eb69(0x1e0)),
          _0x4879de = a0_0x33bfaf["resolve"](_0x6676a0, _0x449a54),
          _0x1c3a4b = a0_0x33bfaf[_0x53eb69(0x1d6)](_0x6676a0, _0x14906a)
        console[_0x53eb69(0x1fa)](_0x53eb69(0x1d5))
        const _0x3bcab8 = [_0x53eb69(0x1ff), _0x53eb69(0x200), _0x53eb69(0x207)],
          _0x2df80b = needBuildElectron ? [_0x8999d1, _0x247e31, _0x15a486] : [_0x8999d1]
        for (const _0x26a0a2 of _0x2df80b) {
          const _0x2aedda = a0_0x518d56(_0x53eb69(0x208), { zlib: { level: 0x9 } }),
            _0x1f46bc = createGzip(),
            _0x2bab03 = a0_0x57416b[_0x53eb69(0x1fc)](_0x26a0a2)
          _0x2aedda[_0x53eb69(0x1f3)](_0x1f46bc)[_0x53eb69(0x1f3)](_0x2bab03)
          if (_0x26a0a2 === _0x8999d1)
            _0x2aedda[_0x53eb69(0x1f2)](_0x53eb69(0x1d1), { cwd: _0x263c40, ignore: _0x3bcab8 }, { prefix: _0x401dbc })
          else {
            if (_0x26a0a2 === _0x247e31)
              _0x2aedda["glob"](_0x53eb69(0x1d1), { cwd: _0x4879de, ignore: _0x3bcab8 }, { prefix: _0x449a54 })
            else
              _0x26a0a2 === _0x15a486 &&
                _0x2aedda[_0x53eb69(0x1f2)]("**/*", { cwd: _0x1c3a4b, ignore: _0x3bcab8 }, { prefix: _0x14906a })
          }
          await _0x2aedda["finalize"]()
        }
        console["log"](_0x53eb69(0x20a) + (needUpload ? _0x53eb69(0x1ea) : ""))
        if (!needUpload) return
        const _0x183d08 = targetOssObject + "/" + _0xbf5d9e + "/"
        await uploadToOSS(_0x183d08, _0x2df80b), console[_0x53eb69(0x1fa)](_0x53eb69(0x1ed))
      }
    }
  }
}
