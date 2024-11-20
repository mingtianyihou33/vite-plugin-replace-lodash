# vite-plugin-replace-lodash

**English** | [中文](./README.zh_CN.md)

A `Vite` plugin is used to replace `lodash` with `lodash-es` to prevent all lodash modules are imported and the bundle volume is too large because it cannot tree-shaking.

Notice: The `lodash-es` module needs to be installed separately.

## Install

npm:

```bash
npm install vite-plugin-replace-lodash
```

pnpm:

```bash
pnpm add vite-plugin-replace-lodash
```

## Usage

```typescript
import { defineConfig } from 'vite';
import { replaceLodash } from 'vite-plugin-replace-lodash';

export default defineConfig({
  plugins: [replaceLodash()],
})
```