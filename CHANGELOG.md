# Changelog

## v0.7.0 — MenuList 组件（2026-03-02）

- `packages/ui/src/menu-list/types.ts`：`MenuItemData` / `MenuGroupData` / `MenuListItem` 数据类型，`isMenuGroup` type guard（双重字段检查防误判），`RenderItemMeta`，`MenuListProps`，含完整 JSDoc
- `packages/ui/src/menu-list/MenuList.css.ts`：list / groupLabel / item / itemActive / itemDisabled / expandIcon 样式，`group` 复用 `list` class，`--menu-level` CSS variable 控制嵌套缩进，`:focus-visible` 焦点轮廓
- `packages/ui/src/menu-list/MenuList.tsx`：`MenuList` 组件，`renderItem` slot 多态渲染，`activeKey` 激活态，受控/非受控展开状态（`useMemo` 稳定引用），`handleKeyDown` / `handleExpandClick` 提升为稳定 `useCallback`（通过 `data-*` 传递条目信息，所有条目共享同一函数引用），展开 toggle 独立于条目点击，键盘 Enter/Space 按叶子/父节点分支处理，group key 使用 `` `${label ?? 'group'}-${index}` ``，完整 ARIA 语义，含完整 JSDoc
- `packages/ui/src/index.ts`：导出 `MenuList` 及全部类型
- `packages/ui/tsconfig.json`：新增 `lib: ["ES2022", "DOM", "DOM.Iterable"]`

## v0.7.0 — MenuList 组件（2026-03-02）

- `packages/ui/src/menu-list/types.ts`：`MenuItemData` / `MenuGroupData` / `MenuListItem` 数据类型，`isMenuGroup` type guard（双重字段检查），`RenderItemMeta`，`MenuListProps`，含完整 JSDoc
- `packages/ui/src/menu-list/MenuList.css.ts`：list / group / groupLabel / item / itemActive / itemDisabled / expandIcon 样式，`--menu-level` CSS variable 控制嵌套缩进，`:focus-visible` 焦点轮廓
- `packages/ui/src/menu-list/MenuList.tsx`：`MenuList` 组件，`renderItem` slot 多态渲染，`activeKey` 激活态，受控/非受控展开状态（`useMemo` 稳定引用），展开 toggle 独立于条目点击（expand icon 改为 `<button>`），键盘 Enter/Space 按叶子/父节点分支处理，消除 group key 的 `cloneElement`，完整 ARIA 语义，含完整 JSDoc
- `packages/ui/src/index.ts`：导出 `MenuList` 及全部类型
- `packages/ui/tsconfig.json`：新增 `lib: ["ES2022", "DOM", "DOM.Iterable"]`

## v0.6.0 — Layout 组件（2026-03-02）

- `packages/ui/src/layout/Layout.css.ts`：vanilla-extract 样式，`globalStyle` 初始化 `html`/`body` margin/padding，root `height: 100vh`，`scrollArea` / `bounded` / `rootScrollable` 控制滚动容器，CSS sticky 仅用于 `stickySidebar=true + sidebarFull=false` 场景
- `packages/ui/src/layout/Layout.tsx`：`Layout` 组件，`stickyHeader` / `stickySidebar` 控制固定与滚动区域，`sidebarFull` 控制 sidebar 与 header 的位置关系，`stickySidebar` 默认与 `stickyHeader` 同步，含完整 JSDoc
- `packages/ui/src/index.ts`：导出 `Layout`、`LayoutProps`
- `packages/ui/package.json`：新增 `peerDependencies: { react: ">=18", clsx: ">=2" }`

## v0.5.0 — contribute 命令（2026-03-02）

- `scripts/contribute.mjs`：`pnpm contribute` 命令，从子项目将 `packages/` 或 `templates/` 的改动贡献回 `cli-release` 分支
  - starter 地址读取优先级：`.starter-remote`（本地覆盖）> `package.json starterRepo` > prompt
  - 自动配置 `upstream` remote（幂等）并 fetch `cli-release`
  - 多选要贡献的 `packages/<name>` 或 `templates/<type>/<name>` 目录
  - 用 `git worktree` 创建临时分支，复制选中目录，检测变更后 commit
  - push 到 upstream，通过 `gh pr create` 创建 PR（非 GitHub 时打印手动链接）
  - 完成后自动清理 worktree 和临时分支
- `package.json`：新增 `starterRepo` 字段（starter 规范地址，供子项目 contribute 时自动读取）；新增 `contribute` 脚本
- `.gitignore.main`：追加 `.starter-remote`（子项目本��覆盖文件，不应提交）

## v0.4.0 — CLI 增强（2026-03-02）

- `scripts/workspace.mjs`：提取 `listUserProjects()`、`removeFromWorkspace()`、`renameInWorkspace()` 公共函数，读取 `pnpm-workspace.yaml` 并排除 glob 条目
- `scripts/remove.mjs`：`pnpm remove` 命令，多选用户项目，二次确认（默认 N），删除目录并同步更新 workspace
- `scripts/rename.mjs`：`pnpm rename` 命令，选择项目并输入新名称，重命名目录、更新 `package.json` name 字段、同步更新 workspace
- `scripts/templatize.mjs`：来源改为从 workspace 用户项目中选择；存储位置改为先选/新建类型目录，再选/新建模板名称
- `scripts/run.mjs`：`pnpm dev/build/start` 共用脚本，交互式选择具体项目或「全部（并行）」执行
- `package.json`：新增 `remove`、`rename` 脚本；`dev`/`build`/`start` 改为调用 `run.mjs`；移除 `dev:fe`、`dev:be`、`build:fe`、`build:be`、`start:fe`、`start:be`

## v0.3.0 — new 命令（2026-02-28）

- `scripts/new.mjs`：从 `templates/` 选择模板，在根目录创建新项目
  - 交互选择类型（frontend / backend）和模板，单项时自动跳过
  - 项目名称默认为类型名（`frontend` / `backend`），可自定义
  - 同名目录已存在时报错退出（exit code 1）
  - 排除 `node_modules`、`.next`、`dist`、`build`、`coverage`、`.turbo`、`.env*`、`.DS_Store`、`pnpm-workspace.yaml`、`pnpm-lock.yaml`
  - 自动更新项目 `package.json` 的 `name` 字段
  - 依赖去重：按包名移除项目 `package.json` 中根目录已有的包
  - 自动将新项目追加到 `pnpm-workspace.yaml`
  - 在根目录执行 `pnpm install`
- `pnpm-workspace.yaml`：移除默认 `frontend` / `backend` 条目，改由 `pnpm new` 动态添加

## v0.2.0 — templatize 命令（2026-02-28）

- `scripts/templatize.mjs`：将 `frontend/` 或 `backend/` 保存为 `templates/<type>/<name>/` 模板
  - 自动检测可用源目录，单目录时跳过选择步骤
  - 扫描已有模板供更新，或新建；更新时直接覆盖无需确认
  - 排除 `node_modules`、`.next`、`dist`、`build`、`coverage`、`.turbo`、`.env*`、`.DS_Store`
  - 自动更新模板 `package.json` 的 `name` 字段

## v0.1.0 — Monorepo 基础搭建（2026-02-28）

- `package.json`：添加 workspace 脚本、devDependencies、engines、packageManager
- `pnpm-workspace.yaml`：声明 packages/*、templates/*、frontend、backend
- `tsconfig.base.json`：公共 TypeScript 配置，供 packages/ 各包继承
- `packages/utils`：@starter/utils 骨架（source-only）
- `packages/hooks`：@starter/hooks 骨架（source-only）
- `packages/ui`：@starter/ui 骨架（source-only，含 @vanilla-extract/css）
