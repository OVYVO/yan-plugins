<h1 align="center">vite-plugin-form-autoattrs</h1>

<p align="center">
  A vite plugin for batch adding clearable attributes to filter box form elements
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@ovyvo/vite-plugin-form-autoattrs">
    <img src="https://img.shields.io/npm/v/@ovyvo/vite-plugin-form-autoattrs?color=orange&label=" alt="version" />
  </a>
  <a href="https://github.com/qmhc/@ovyvo/vite-plugin-searchform-clear/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@ovyvo/vite-plugin-form-autoattrs" alt="license" />
  </a>
</p>

## 安装

```sh
pnpm i @ovyvo/vite-plugin-form-autoattrs -D
```

## 使用

```ts
//vite.config.ts
import { searchFormClear } from "@ovyvo/vite-plugin-form-autoattrs";

export default defineConfig({
  plugins: [searchFormClear()],
});
```

## 参数

| 属性     | 描述                            | 类型          | 默认值        |
| -------- | ------------------------------- | ------------- | ------------- |
| excludes | 排除无需自动添加属性的 formItem | Array<string> | ['el-button'] |
