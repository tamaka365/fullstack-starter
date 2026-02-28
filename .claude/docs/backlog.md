# Backlog

未规划的需求池，按来源归类整理。

---

## Monorepo 基础搭建

- 配置根目录 `package.json`：workspace 脚本（create、dev、typecheck）、devDependencies（@inquirer/prompts、typescript）、engines（node >=20，pnpm >=9）
- 创建 `pnpm-workspace.yaml`：声明 packages/*、templates/*、frontend、backend
- 创建 `tsconfig.base.json`：供 packages/ 各包继承，target ES2022、strict、moduleResolution bundler、jsx react-jsx
- 创建 `@starter/ui`：Button 组件，基于 vanilla-extract，支持 variant（primary / secondary / ghost）和 size（sm / md / lg）
- 创建 `@starter/hooks`：useLocalStorage（SSR 安全）、useDebounce
- 创建 `@starter/utils`：cn 工具函数

---

## 项目模板

- 创建 `templates/nextjs`：Next.js 15 App Router，集成 vanilla-extract，引用 @starter/* 包，独立 tsconfig
- 创建 `templates/backend`：NestJS 11，包含 health 端点，独立 tsconfig

---

## create 命令

- 实现 `scripts/create.mjs`：@inquirer/prompts 多选交互，从模板复制到 frontend / backend，自动执行 pnpm install，输出 next steps 提示
