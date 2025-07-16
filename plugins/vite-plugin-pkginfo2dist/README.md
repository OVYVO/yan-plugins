<h1 align="center">vite-plugin-pkginfo2dist</h1>

<p align="center">
  A vite plugin for copy package info to dist dict
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@ovyvo/vite-plugin-pkginfo2dist">
    <img src="https://img.shields.io/npm/v/@ovyvo/vite-plugin-pkginfo2dist?color=orange&label=" alt="version" />
  </a>
  <a href="https://github.com/qmhc/@ovyvo/vite-plugin-pkginfo2dist/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@ovyvo/vite-plugin-pkginfo2dist" alt="license" />
  </a>
</p>

## 安装

```sh
pnpm i @ovyvo/vite-plugin-pkginfo2dist -D
```

## 使用

```ts
//vite.config.ts
import { pkginfo2dist } from "@ovyvo/vite-plugin-pkginfo2dist";

export default defineConfig({
  plugins: [pkginfo2dist({
    fields:[],
    fileName: 'pkg_info.json'
    customFields:{}
  })],
});
```

## 参数

| 属性         | 描述             | 类型                | 默认值             |
| ------------ | ---------------- | ------------------- | ------------------ |
| fields       | 需要 copy 的字段 | Array<string>       | ['name','version'] |
| fileName     | 信息保存文件     | string              | pkg_info.json      |
| customFields | 自定义信息       | Record<string, any> | {}                 |
