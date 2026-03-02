'use client'

import { clsx } from 'clsx'
import { createContext, useCallback, useContext, useState } from 'react'
import * as styles from './Sidebar.css'
import type { SidebarContextValue, SidebarProps } from './types'

// ─── SidebarContext ────────────────────────────────────────────────────────────

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  toggle: () => {},
})

/**
 * useSidebar — 获取 Sidebar 折叠状态和切换方法
 *
 * 在 Sidebar 外部调用时安全降级（collapsed: false，toggle: noop）。
 */
export function useSidebar(): SidebarContextValue {
  return useContext(SidebarContext)
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

/**
 * Sidebar — 侧边栏布局容器
 *
 * 持有折叠状态并通过 SidebarContext 向下透传，供 SidebarNav 等子组件消费。
 * 宽度过渡由 CSS variable `--sidebar-width` 驱动，`transition: width 0.25s ease`。
 *
 * @example
 * ```tsx
 * <Sidebar header={<Logo />} footer={<UserInfo />}>
 *   <SidebarNav items={items} linkComponent={Link} activeKey={pathname} />
 * </Sidebar>
 * ```
 */
export function Sidebar({
  children,
  header,
  footer,
  collapsed,
  onCollapsedChange,
  defaultCollapsed = false,
  expandedWidth = 240,
  collapsedWidth = 56,
  style,
  className,
}: SidebarProps) {
  const isControlled = collapsed !== undefined
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
  const isCollapsed = isControlled ? collapsed! : internalCollapsed

  const toggle = useCallback(() => {
    const next = !isCollapsed
    if (!isControlled) setInternalCollapsed(next)
    onCollapsedChange?.(next)
  }, [isControlled, isCollapsed, onCollapsedChange])

  const width = isCollapsed ? collapsedWidth : expandedWidth

  return (
    <SidebarContext.Provider value={{ collapsed: isCollapsed, toggle }}>
      <div
        className={clsx(styles.sidebar, className)}
        style={{ ['--sidebar-width' as string]: `${width}px`, ...style }}
      >
        {header && <div className={styles.sidebarHeader}>{header}</div>}
        <div className={styles.scrollArea}>{children}</div>
        {footer && <div className={styles.sidebarFooter}>{footer}</div>}
      </div>
    </SidebarContext.Provider>
  )
}
