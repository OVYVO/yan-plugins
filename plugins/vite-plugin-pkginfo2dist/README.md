<h1 align="center">vite-plugin-searchform-clear</h1>

<p align="center">
  A vite plugin for batch adding clearable attributes to filter box form elements
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@ovyvo/vite-plugin-searchform-clear">
    <img src="https://img.shields.io/npm/v/@ovyvo/vite-plugin-searchform-clear?color=orange&label=" alt="version" />
  </a>
  <a href="https://github.com/qmhc/@ovyvo/vite-plugin-searchform-clear/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@ovyvo/vite-plugin-searchform-clear" alt="license" />
  </a>
</p>

## 安装

```sh
pnpm i @ovyvo/vite-plugin-searchform-clear -D
```

## 使用

```ts
//vite.config.ts
import { searchFormClear } from "./src/plugin/myPlugin.js";

export default defineConfig({
  plugins: [searchFormClear()],
});
```

## 参数

| 属性     | 描述                            | 类型          | 默认值        |
| -------- | ------------------------------- | ------------- | ------------- |
| excludes | 排除无需自动添加属性的 formItem | Array<string> | ['el-button'] |
