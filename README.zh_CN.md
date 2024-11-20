# vite-plugin-replace-lodash

**中文** | [English](./README.md)

用于替换 `lodash` 为 `lodash-es` 的 `Vite` 插件，避免lodash模块被全部引入，无法 tree-shaking，造成打包结果的bundle体积过大。

注意：需要单独安装 `lodash-es` 模块

## 安装

npm:

```bash
npm install vite-plugin-replace-lodash
```

pnpm:

```bash
pnpm add vite-plugin-replace-lodash
```

## 使用
```typescript
import { defineConfig } from 'vite';
import { replaceLodash } from 'vite-plugin-replace-lodash';

export default defineConfig({
  plugins: [replaceLodash()],
})
```