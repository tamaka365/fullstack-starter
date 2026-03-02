import type React from 'react'

// ─── SidebarContext ────────────────────────────────────────────────────────────

/** SidebarContext 向下透传的值 */
export interface SidebarContextValue {
  /** 当前是否处于折叠状态 */
  collapsed: boolean
  /** 切换折叠/展开 */
  toggle: () => void
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

/**
 * Sidebar 布局组件 props
 *
 * @example
 * ```tsx
 * <Sidebar header={<Logo />} footer={<UserInfo />}>
 *   <SidebarNav items={items} linkComponent={Link} activeKey={pathname} />
 * </Sidebar>
 * ```
 */
export interface SidebarProps {
  /** 中间可滚动区域，通常放 SidebarNav */
  children?: React.ReactNode
  /** 顶部固定区域（logo、品牌名等） */
  header?: React.ReactNode
  /** 底部固定区域（用户信息、退出等） */
  footer?: React.ReactNode
  /** 受控折叠状态；不传则内部维护 */
  collapsed?: boolean
  /** 受控时的状态变更回调 */
  onCollapsedChange?: (collapsed: boolean) => void
  /**
   * 非受控初始折叠状态
   * @default false
   */
  defaultCollapsed?: boolean
  /**
   * 展开宽度（px）
   * @default 240
   */
  expandedWidth?: number
  /**
   * 折叠宽度（px）
   * @default 56
   */
  collapsedWidth?: number
}

// ─── SidebarNav ──────────────���────────────────────────────────────────────────

/** 侧边栏导航条目数据结构 */
export interface SidebarNavItemData {
  /** 条目唯一标识，通常与路由 pathname 对应 */
  key: string
  /** 条目显示文本 */
  label: string
  /** 条目图标；折叠态若无 icon 则显示 label 首字符 */
  icon?: React.ReactNode
  /** 目标路径；外链（http/https 开头）自动降级为原生 `<a target="_blank">` */
  href: string
  /** 子菜单条目；有子项时父节点不可直接跳转 */
  children?: SidebarNavItemData[]
  /** 是否禁用，禁用时不可交互 */
  disabled?: boolean
}

/**
 * SidebarNav 导航组件 props
 *
 * @example
 * ```tsx
 * <SidebarNav
 *   items={navItems}
 *   linkComponent={Link}
 *   activeKey={pathname}
 * />
 * ```
 */
export interface SidebarNavProps {
  /** 导航条目数据 */
  items: SidebarNavItemData[]
  /**
   * 路由 Link 组件（Next.js Link、React Router Link 等）。
   * 外部链接（http/https 开头）自动降级为原生 `<a target="_blank">`，不使用此组件。
   * @default 'a'
   */
  linkComponent?: React.ElementType
  /** 当前激活条目的 key，通常为当前路由 pathname */
  activeKey?: string
}
