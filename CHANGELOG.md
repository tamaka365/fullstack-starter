# Changelog

## v0.10.0 — Tooltip 组件（2026-03-03）

- `packages/ui/src/tooltip/types.ts`：`TooltipProps` 类型定义，`content` / `children` / `placement` / `openDelay` / `closeDelay` / `disabled`，含完整 JSDoc
- `packages/ui/src/tooltip/Tooltip.css.ts`：`tooltipContent` 样式（白色背景、`border-radius: 6`、`box-shadow`、`padding: 6px 10px`、`font-size: 0.875rem`、`white-space: nowrap`）
- `packages/ui/src/tooltip/Tooltip.tsx`：`Tooltip` 组件，基于 `Popover` 封装，`triggers="hover"`，`React.cloneElement` 将 floating-ui ref 和事件注入子元素，`disabled` 时直接返回 `children`
- `packages/ui/src/index.ts`：导出 `Tooltip`、`TooltipProps`

## v0.9.3 — lucide-react 集成 + peerDependencies 重组（2026-03-02）

- `packages/ui/package.json`：所有运行时依赖迁移到 `peerDependencies`（含 `@floating-ui/react`、`@vanilla-extract/css`、`clsx`），消除 `dependencies` / `devDependencies` 冗余；仅保留 `@types/react`、`typescript` 作为纯构建工具放入 `devDependencies`；peer 版本范围改为宽松下界（`>=`），不锁上界
- `packages/ui/package.json`：新增 `lucide-react >=0.300.0` peer 依赖
- `packages/ui/src/menu-list/MenuList.tsx`：展开图标从 Unicode 字符 `▶` 改为 `lucide-react` 的 `ChevronRight`，`size="1em"` 跟随字号缩放；`<button>` 包裹层改为语义中性的 `<span aria-hidden>`，点击展开由父级 `div[role=menuitem]` 的 `onClick` 统一处理
- `packages/ui/src/menu-list/MenuList.css.ts`：新增 `icon` class（`display: flex`，消除 SVG baseline 偏移）；`expandIcon` 移除 button reset 样式

## v0.9.2 — MenuList API 重构 + SidebarNav 导航增强（2026-03-02）

- `packages/ui/src/menu-list/types.ts`：`MenuListProps.renderItem` 改为 `renderAs?: React.ElementType` + `getItemProps?: (item) => Record<string, unknown>`，移除 `RenderItemMeta` 类型
- `packages/ui/src/menu-list/MenuList.tsx`：`renderAs` 仅应用于叶子节点（`!hasChildren`），父节点行点击（`onClick={handleItemClick}`）直接触发展开/收起，无需单独点击箭头；移除 `handleExpandClick`
- `packages/ui/src/sidebar/types.ts`：新增 `SidebarNavGroupData` 接口（`groupLabel` + `items`）；`SidebarNavItemData.href` 改为可选（有 children ���可省略）；`SidebarNavProps.items` 改为 `(SidebarNavItemData | SidebarNavGroupData)[]`
- `packages/ui/src/sidebar/SidebarNav.tsx`：新增 `isSidebarNavGroup`、`toMenuListItem`、`flattenNavItems` 工具函数；新增 `collectAncestorKeys` 递归收集激活条目的祖先 key 链，传入 `MenuList` 的 `defaultExpandedKeys` 实现页面加载时自动展开父节点；`getItemProps` 增加 href 空值守卫
- `packages/ui/src/sidebar/SidebarNav.css.ts`：移除多余样式
- `packages/ui/src/index.ts`：导出 `SidebarNavGroupData`；移除已删除的 `RenderItemMeta`

## v0.9.1 — ui-example docs 路由（2026-03-02）

- `packages/ui/src/sidebar/Sidebar.tsx`：加 `'use client'`，新增 `style` / `className` prop
- `packages/ui/src/sidebar/SidebarNav.tsx`：加 `'use client'`
- `packages/ui/src/popover/Popover.tsx`：加 `'use client'`
- `packages/ui/src/menu-list/MenuList.tsx`：加 `'use client'`
- `packages/ui/src/sidebar/types.ts`：`SidebarProps` 新增 `style?: CSSProperties`、`className?: string`
- `ui-example/next.config.ts`：集成 `@next/mdx`，`pageExtensions` 加入 `mdx`
- `ui-example/mdx-components.tsx`：MDX 组件注册入口
- `ui-example/src/app/(docs)/layout.tsx`：docs 路由组布局，使用 `UIProvider` + `Layout` + `DocsSidebar`
- `ui-example/src/app/(docs)/docs-sidebar.tsx`：客户端侧边栏，`usePathname` 驱动 `activeKey`，`useSidebar` 驱动折叠按钮
- `ui-example/src/app/(docs)/layout/page.mdx` + `demo.tsx`：Layout 组件文档与示例
- `ui-example/src/app/(docs)/menu-list/page.mdx` + `demo.tsx`：MenuList 组件文档与示例
- `ui-example/src/app/(docs)/popover/page.mdx` + `demo.tsx`：Popover 组件文档与示例
- `ui-example/src/app/(docs)/sidebar/page.mdx` + `demo.tsx`：Sidebar 组件文档与示例

## v0.9.0 — Sidebar + SidebarNav 组件（2026-03-02）

- `packages/ui/src/sidebar/types.ts`：`SidebarContextValue`、`SidebarProps`、`SidebarNavItemData`、`SidebarNavProps` 类型定义，含完整 JSDoc
- `packages/ui/src/sidebar/Sidebar.css.ts`：CSS variable `--sidebar-width` 驱动宽度，`transition: width 0.25s ease` 过渡动画，`scrollArea` flex 滚动区域
- `packages/ui/src/sidebar/Sidebar.tsx`：`Sidebar` 组件，受控/非受控折叠状态，`SidebarContext` + `useSidebar` hook，`header` / `footer` slot
- `packages/ui/src/sidebar/SidebarNav.css.ts`：折叠态 `iconButton` / `iconButtonActive` 样式，展开态 `nav` / `collapsedNav` 容器
- `packages/ui/src/sidebar/SidebarNav.tsx`：`SidebarNav` 组件，消费 `useSidebar()` 感知折叠状态；展开态渲染完整 `MenuList`；折叠态渲染 icon 按钮 + `Popover` 弹出子菜单；`linkComponent` prop 处理路由链接，外链自动降级为 `<a target="_blank">`
- `packages/ui/src/index.ts`：导出 `Sidebar`、`SidebarNav`、`useSidebar` 及全部类型
- `ui-example/src/app/sidebar/page.tsx`：演示页面，覆盖非受控折叠、受控折叠、外链、禁用、含子菜单折叠态 Popover 六个场景

## v0.8.0 — Popover 组件（2026-03-02）

- `packages/ui/src/ui-provider/UIProvider.tsx`：`UIProvider` 组件，渲染两个相邻 div（appRoot + portalRoot），通过 `PortalContext` 向下透传 portalRoot 引用；`usePortalRoot` hook 供浮层组件消费；`'use client'` 声明
- `packages/ui/src/ui-provider/UIProvider.css.ts`：appRoot / portalRoot 样式（position relative），portalRoot 作为后兄弟节点天然在 appRoot 上层，无需 z-index
- `packages/ui/src/popover/types.ts`：`PopoverTrigger`（'hover' | 'click' | 'focus' 单选）、`TriggerProps`（含上游类型限制说明）、`PopoverProps`（`trigger` render prop 替代 children，`triggers` 单值联合类型）
- `packages/ui/src/popover/Popover.tsx`：`trigger` render prop 消除 `cloneElement`；`useHover` / `useClick` / `useFocus` 按 `triggers` 单选启用；`safePolygon` 仅 hover 时调用；click/focus 自动启用 `useDismiss`；`useTransitionStyles` 方向感知动画；优先挂载到 UIProvider portalRoot，降级为 document.body
- `packages/ui/src/popover/Popover.css.ts`：删除（z-index 由 DOM 顺序保证，无需 CSS）
- `packages/ui/src/index.ts`：导出 `UIProvider`、`PopoverTrigger`、`TriggerProps`
- `ui-example/src/app/popover/page.tsx`：演示页面，覆盖 hover / click / focus / placement / 受控 / MenuList 组合场景

- `packages/ui/src/ui-provider/UIProvider.css.ts`：appRoot / portalRoot 样式（position relative），portalRoot 作为后兄弟节点天然在 appRoot 上层，无需 z-index
- `packages/ui/src/popover/types.ts`：`PopoverTrigger`（'hover' | 'click' | 'focus'）、`TriggerProps`（含上游类型限制说明）、`PopoverProps`（`children` 改为 `trigger` render prop，新增 `triggers` 多触发方式）
- `packages/ui/src/popover/Popover.tsx`：`trigger` render prop 消除 `cloneElement`，`useHover` / `useClick` / `useFocus` 按 `triggers` 按需启用，`safePolygon` 仅在 hover 启用时调用，click/focus 自动启用 `useDismiss`，`DEFAULT_TRIGGERS` 模块级常量避免默认值引用不稳定，`useTransitionStyles` 方向感知动画，优先挂载到 UIProvider portalRoot，降级为 document.body
- `packages/ui/src/popover/Popover.css.ts`：删除（z-index 由 DOM 结构保证，无需 CSS）
- `packages/ui/src/index.ts`：导出 `UIProvider`、`PopoverTrigger`、`TriggerProps`
- `ui-example/src/app/popover/page.tsx`：演示页面更新，覆盖 hover / click / hover+focus / placement / 受控 / MenuList 组合六个场景

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
