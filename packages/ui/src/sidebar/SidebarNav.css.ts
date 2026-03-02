import { style } from '@vanilla-extract/css'

/** 展开态导航容器 */
export const nav = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '4px 0',
})

/** 折叠态图标列容器 */
export const collapsedNav = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '4px 0',
  gap: 2,
})

/** 折叠态单个图标按钮 */
export const iconButton = style({
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  flexShrink: 0,
  fontSize: 18,
  color: 'inherit',
  ':focus-visible': {
    outline: '2px solid currentColor',
    outlineOffset: 2,
  },
})

/** 折叠态图标按钮激活态 */
export const iconButtonActive = style({
  background: 'rgba(0,0,0,0.08)',
})
