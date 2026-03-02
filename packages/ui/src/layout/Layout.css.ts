import { globalStyle, style } from '@vanilla-extract/css'

globalStyle('html, body', {
  margin: 0,
  padding: 0,
})

export const root = style({
  display: 'flex',
})

export const row = style({ flexDirection: 'row' })
export const column = style({ flexDirection: 'column' })

// 都不固定：内容自然撑高，文档滚动
export const rootNatural = style({ minHeight: '100vh' })

// 有元素固定：root 锁定在视口，内部 scrollArea 滚动
export const rootFixed = style({ height: '100vh' })

// CSS sticky 场景：root 本身是滚动容器
export const rootScrollable = style({
  height: '100vh',
  overflowY: 'auto',
})

// 裁剪溢出，配合 scrollArea 使用
export const bounded = style({ overflow: 'hidden' })

// 实际滚动区域
export const scrollArea = style({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
})

// 内层 flex 容器
export const body = style({
  display: 'flex',
  flex: 1,
  minHeight: 0,
})

export const header = style({ flexShrink: 0 })
export const footer = style({ flexShrink: 0 })
export const sidebar = style({ flexShrink: 0 })

// scrollArea 内用 flex: 1 将 footer 推到底部
export const content = style({
  flex: 1,
  minHeight: 0,
})

// CSS sticky：仅用于 !stickyHeader + stickySidebar + !sidebarFull 场景
export const stickySidebarCSS = style({
  position: 'sticky',
  top: 0,
  alignSelf: 'flex-start',
  maxHeight: '100vh',
  overflowY: 'auto',
  flexShrink: 0,
})
