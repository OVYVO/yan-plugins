;(function (_0x370d9b, _0x315bc1) {
  const _0x19521b = a0_0xb291,
    _0x5aa539 = _0x370d9b()
  while (!![]) {
    try {
      const _0x30e7db =
        -parseInt(_0x19521b(0x175)) / 0x1 +
        (-parseInt(_0x19521b(0x171)) / 0x2) * (parseInt(_0x19521b(0x191)) / 0x3) +
        parseInt(_0x19521b(0x178)) / 0x4 +
        -parseInt(_0x19521b(0x172)) / 0x5 +
        -parseInt(_0x19521b(0x195)) / 0x6 +
        -parseInt(_0x19521b(0x190)) / 0x7 +
        parseInt(_0x19521b(0x16c)) / 0x8
      if (_0x30e7db === _0x315bc1) break
      else _0x5aa539["push"](_0x5aa539["shift"]())
    } catch (_0x2529db) {
      _0x5aa539["push"](_0x5aa539["shift"]())
    }
  }
})(a0_0x52db, 0x61ae4)
import a0_0x3ef636 from "fs"
import a0_0x3fb302 from "path"
import a0_0x4d521d from "archiver"
import { createGzip } from "zlib"
import a0_0x5349a6 from "ali-oss"
function a0_0xb291(_0x4cc6c0, _0x3a86a4) {
  const _0x52db4d = a0_0x52db()
  return (
    (a0_0xb291 = function (_0xb29122, _0x1c8f9d) {
      _0xb29122 = _0xb29122 - 0x169
      let _0x56ea16 = _0x52db4d[_0xb29122]
      return _0x56ea16
    }),
    a0_0xb291(_0x4cc6c0, _0x3a86a4)
  )
}
const uploadToOSS = (_0x574ac8, _0x425499 = []) => {
  return new Promise(async (_0x5da502, _0x3617e4) => {
    const _0x1dbc60 = a0_0xb291,
      _0x3d4a87 = process[_0x1dbc60(0x17c)][_0x1dbc60(0x187)] || "",
      _0x41a95e = process["env"][_0x1dbc60(0x183)] || ""
    ;(!_0x3d4a87 || !_0x41a95e) && (console["log"](_0x1dbc60(0x173)), _0x3617e4())
    const _0x584148 = new a0_0x5349a6({
      region: _0x1dbc60(0x19c),
      accessKeyId: _0x3d4a87,
      accessKeySecret: _0x41a95e,
      bucket: _0x1dbc60(0x18c),
      authorizationV4: !![]
    })
    try {
      if (!_0x425499["length"]) return console[_0x1dbc60(0x176)](_0x1dbc60(0x192))
      for (const _0x32c749 of _0x425499) {
        const _0x4b7b37 = "" + _0x574ac8 + a0_0x3fb302[_0x1dbc60(0x18e)](_0x32c749)
        try {
          await _0x584148[_0x1dbc60(0x196)](_0x4b7b37), await _0x584148[_0x1dbc60(0x17d)](_0x4b7b37)
        } catch (_0x16b113) {
          if (_0x16b113["code"] !== _0x1dbc60(0x185)) throw _0x16b113
        }
        const _0x157ecb = await _0x584148[_0x1dbc60(0x179)](_0x4b7b37, _0x32c749)
        console[_0x1dbc60(0x176)](_0x1dbc60(0x19a) + _0x157ecb[_0x1dbc60(0x18d)])
      }
      _0x5da502()
    } catch (_0x149271) {
      console[_0x1dbc60(0x176)](_0x1dbc60(0x16d), _0x149271), _0x3617e4()
    }
  })
}
export default function buildEndZipped({
  needUpload: needUpload = !![],
  needBuildElectron: needBuildElectron = !![],
  proShortName: proShortName = "",
  targetOssObject: targetOssObject = ""
} = {}) {
  const _0x1636db = a0_0xb291
  let _0xd03ca4, _0x371aca, _0x33807a, _0x367c00
  return {
    name: "vite-plugin-buildend-zipped",
    apply: "build",
    configResolved(_0x1337ea) {
      const _0xea6f15 = a0_0xb291
      ;(_0xd03ca4 = a0_0x3fb302[_0xea6f15(0x169)](_0x1337ea[_0xea6f15(0x18a)][_0xea6f15(0x198)])),
        (_0x371aca = a0_0x3fb302[_0xea6f15(0x169)](process[_0xea6f15(0x197)](), _0xea6f15(0x17f))),
        (_0x33807a = a0_0x3fb302["resolve"](process[_0xea6f15(0x197)](), "package.json")),
        (_0x367c00 = _0x1337ea[_0xea6f15(0x193)])
    },
    closeBundle: {
      sequential: !![],
      order: _0x1636db(0x181),
      handler: async () => {
        const _0x510059 = _0x1636db
        if (_0x367c00 !== _0x510059(0x19d)) return
        if (!proShortName) return console[_0x510059(0x176)]("🚨\x20请填写项目名称简写，例如：pmg")
        if (!targetOssObject) return console["log"](_0x510059(0x16b))
        if (!a0_0x3ef636[_0x510059(0x182)](_0x33807a)) return
        if (!a0_0x3ef636["existsSync"](_0xd03ca4)) return
        if (!a0_0x3ef636[_0x510059(0x182)](_0x371aca) && needBuildElectron) return
        const _0x222b84 = JSON["parse"](a0_0x3ef636[_0x510059(0x19f)](_0x33807a, "utf-8"))[_0x510059(0x16f)],
          _0x5b5605 = a0_0x3fb302[_0x510059(0x169)](process[_0x510059(0x197)](), _0x510059(0x16e), "" + _0x222b84)
        if (a0_0x3ef636[_0x510059(0x182)](_0x5b5605)) a0_0x3ef636["rmSync"](_0x5b5605, { recursive: !![], force: !![] })
        a0_0x3ef636[_0x510059(0x18b)](_0x5b5605, { recursive: !![] }),
          console[_0x510059(0x176)](_0x510059(0x184) + _0x5b5605)
        const _0x312498 = proShortName + _0x510059(0x16a) + _0x222b84,
          _0x44a32e = proShortName + _0x510059(0x19e) + _0x222b84 + _0x510059(0x194),
          _0x534fd2 = proShortName + _0x510059(0x19e) + _0x222b84 + _0x510059(0x18f),
          _0x44a3b4 = a0_0x3fb302[_0x510059(0x169)](_0x5b5605, _0x312498 + _0x510059(0x180)),
          _0x2cf367 = a0_0x3fb302[_0x510059(0x169)](_0x5b5605, _0x44a32e + _0x510059(0x180)),
          _0x58abad = a0_0x3fb302[_0x510059(0x169)](_0x5b5605, _0x534fd2 + _0x510059(0x180)),
          _0x1b8bf8 = a0_0x3fb302[_0x510059(0x169)](_0x371aca, _0x44a32e),
          _0x44c856 = a0_0x3fb302[_0x510059(0x169)](_0x371aca, _0x534fd2)
        console[_0x510059(0x176)](_0x510059(0x170))
        const _0x288f41 = [_0x510059(0x174), _0x510059(0x19b), "**/__MACOSX/**"],
          _0x33203d = needBuildElectron ? [_0x44a3b4, _0x2cf367, _0x58abad] : [_0x44a3b4]
        for (const _0x14624e of _0x33203d) {
          const _0x4eb66c = a0_0x4d521d(_0x510059(0x17e), { zlib: { level: 0x9 } }),
            _0x5ec67d = createGzip(),
            _0x492e2c = a0_0x3ef636[_0x510059(0x189)](_0x14624e)
          _0x4eb66c[_0x510059(0x188)](_0x5ec67d)["pipe"](_0x492e2c)
          if (_0x14624e === _0x44a3b4)
            _0x4eb66c[_0x510059(0x199)](_0x510059(0x17a), { cwd: _0xd03ca4, ignore: _0x288f41 }, { prefix: _0x312498 })
          else {
            if (_0x14624e === _0x2cf367)
              _0x4eb66c[_0x510059(0x199)](
                _0x510059(0x17a),
                { cwd: _0x1b8bf8, ignore: _0x288f41 },
                { prefix: _0x44a32e }
              )
            else
              _0x14624e === _0x58abad &&
                _0x4eb66c[_0x510059(0x199)](
                  _0x510059(0x17a),
                  { cwd: _0x44c856, ignore: _0x288f41 },
                  { prefix: _0x534fd2 }
                )
          }
          await _0x4eb66c["finalize"]()
        }
        console[_0x510059(0x176)](_0x510059(0x17b) + (needUpload ? _0x510059(0x177) : ""))
        if (!needUpload) return
        const _0x1df88a = targetOssObject + "/" + _0x222b84 + "/"
        await uploadToOSS(_0x1df88a, _0x33203d), console[_0x510059(0x176)](_0x510059(0x186))
      }
    }
  }
}
function a0_0x52db() {
  const _0x52efa4 = [
    "createWriteStream",
    "build",
    "mkdirSync",
    "jg-deliver",
    "url",
    "basename",
    "-arm64",
    "1113987zPsmWd",
    "3lQnzwJ",
    "🚨\x20无上传文件，请确认文件是否存在",
    "mode",
    "-x86_64",
    "3004050Hcijrq",
    "head",
    "cwd",
    "outDir",
    "glob",
    "📤\x20文件已成功上传，下载地址：",
    "**/.AppleDouble",
    "oss-cn-shanghai",
    "online",
    "-app-",
    "readFileSync",
    "resolve",
    "-frontend-",
    "🚨\x20请填写AliOSS存储对象，例如：pmg/main-server",
    "14328096dUSJga",
    "🚨\x20OSS上传失败",
    "dist",
    "version",
    "🚚\x20开始构建产物压缩包",
    "671270EewuHJ",
    "2424710eOpxlE",
    "🚨\x20未读取到OSS_ACCESS_KEY_ID或OSS_ACCESS_KEY_SECRET配置",
    "**/.DS_Store",
    "615494gRArTj",
    "log",
    "，准备上传阿里云OSS",
    "2819900dVIKLQ",
    "put",
    "**/*",
    "👽️\x20压缩包构建完成",
    "env",
    "delete",
    "tar",
    "dist/appImage",
    ".tar.gz",
    "post",
    "existsSync",
    "OSS_ACCESS_KEY_SECRET",
    "📁\x20成功创建产物目录：",
    "NoSuchKey",
    "🚀\x20文件已全部上传",
    "OSS_ACCESS_KEY_ID",
    "pipe"
  ]
  a0_0x52db = function () {
    return _0x52efa4
  }
  return a0_0x52db()
}
