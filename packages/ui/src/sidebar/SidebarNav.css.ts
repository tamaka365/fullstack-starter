import { style } from '@vanilla-extract/css'

const navBase = style({
  display: 'flex',
  flexDirection: 'column',
})

/** 展开态导航容器 */
export const nav = style([navBase])

/** 折叠态图标列容器 */
export const collapsedNav = style([navBase, {
  alignItems: 'center',
  gap: 2,
}])

/** 折叠态单个图标按钮 */
export const iconButton = style({
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
