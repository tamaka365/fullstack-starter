# Todo

按版本迭代记录需求，每个版本包含简介、详细文档链接和当前状态。

---

## v0.1.0 — Monorepo 基础搭建

搭建 pnpm monorepo 骨架：根目录配置、公共 tsconfig、三个 @starter/* 包（ui / hooks / utils）骨架。

详细文档：[.claude/docs/v0.1.0.md](.claude/docs/v0.1.0.md)

状态：**已完成**

---

## v0.2.0 — templatize 命令

将 `frontend/` 或 `backend/` 开发完的项目保存为可复用模板。

详细文档：[.claude/docs/v0.2.0.md](.claude/docs/v0.2.0.md)

状态：**已完成**

---

## v0.3.0 — new 命令

从 `templates/` 目录选择模板，创建新项目到 `frontend/<name>` 或 `backend/<name>`，依赖去重后在根目录执行 `pnpm install`。

详细文档：[.claude/docs/v0.3.0.md](.claude/docs/v0.3.0.md)

状态：**已完成**

---

## v0.4.0 — CLI 增强

新增 `remove` / `rename` 命令；优化 `templatize` 来源与存储交互；重设计 `dev` / `build` / `start` 为交互式，移除 `dev:fe` 等快捷脚本。

详细文档：[.claude/docs/v0.4.0.md](.claude/docs/v0.4.0.md)

状态：**已完成**

---

## v0.5.0 — contribute 命令

从子项目将 `packages/` 或 `templates/` 的改动贡献回 `cli-release` 分支并创建 PR。

详细文档：[.claude/docs/v0.5.0.md](.claude/docs/v0.5.0.md)

状态：**已完成**

---

## v0.6.0 — Layout 组件

在 `packages/ui` 中实现 `Layout` 组件，支持 7 种经典布局模式，vanilla-extract 样式。

详细文档：[.claude/docs/v0.6.0.md](.claude/docs/v0.6.0.md)

状态：**已完成**

---

## v0.7.0 — MenuList 组件

在 `packages/ui` 中实现 `MenuList` 原始组件，作为 Menu、SidebarNav 等上层组件的共用基础。

详细文档：[.claude/docs/v0.7.0.md](.claude/docs/v0.7.0.md)

状态：**已完成**

---

## v0.8.0 — Popover 组件

在 `packages/ui` 中实现 `Popover` 通用浮层原语，基于 `@floating-ui/react`，hover 触发，portal 渲染，CSS 动画，受控/非受控 open 状态。

详细文档：[.claude/docs/v0.8.0.md](.claude/docs/v0.8.0.md)

状态：**已完成**

---

## v0.9.0 — Sidebar + SidebarNav 组件

在 `packages/ui` 中实现侧边栏布局组件 `Sidebar` 和导航组件 `SidebarNav`，通过 `SidebarContext` 共享折叠状态；CSS transition 宽度动画；折叠态 hover Popover 弹出子菜单；`linkComponent` prop 处理路由/外链。

详细文档：[.claude/docs/v0.9.0.md](.claude/docs/v0.9.0.md)

状态：**已完成**

---

## v0.10.0 — Tooltip 组件

在 `packages/ui` 中实现 `Tooltip` 组件，基于 `Popover` 封装，hover 触发，纯文本内容，统一样式，供 SidebarNav 折叠态及其他场景复用。

详细文档：[.claude/docs/v0.10.0.md](.claude/docs/v0.10.0.md)

状态：**已完成**

