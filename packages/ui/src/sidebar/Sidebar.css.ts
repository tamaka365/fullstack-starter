import { style } from '@vanilla-extract/css'

/** 侧边栏根容器，宽度由 CSS variable --sidebar-width 驱动 */
export const sidebar = style({
  width: 'var(--sidebar-width)',
  transition: 'width 0.25s ease',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flexShrink: 0,
})

/** 顶部固定区域 */
export const sidebarHeader = style({
  flexShrink: 0,
  overflow: 'hidden',
})

/** 中间可滚动区域 */
export const scrollArea = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
})

/** 底部固定区域 */
export const sidebarFooter = style({
  flexShrink: 0,
  overflow: 'hidden',
})
