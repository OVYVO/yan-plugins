<h1 align="center">vite-plugin-buildend-tar</h1>

<p align="center">
  A vite plugin for Package into tar.gz compressed file
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@ovyvo/vite-plugin-buildend-tar">
    <img src="https://img.shields.io/npm/v/@ovyvo/vite-plugin-buildend-tar?color=orange&label=" alt="version" />
  </a>
  <a href="https://github.com/qmhc/@ovyvo/vite-plugin-buildend-tar/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@ovyvo/vite-plugin-buildend-tar" alt="license" />
  </a>
</p>

## 安装

```sh
pnpm i @ovyvo/vite-plugin-buildend-tar -D
```

## 使用

```ts
//vite.config.ts
import buildEndTar from "@ovyvo/vite-plugin-buildend-tar";

export default defineConfig({
  plugins: [buildEndTar()],
});
```
