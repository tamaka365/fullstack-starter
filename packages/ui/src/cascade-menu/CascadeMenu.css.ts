import { style } from '@vanilla-extract/css'

export const menu = style({
  background: '#fff',
  borderRadius: 8,
  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  padding: '4px 0',
  minWidth: 160,
})

export const chevron = style({
  marginInlineStart: 'auto',
  display: 'flex',
})

export const parentItem = style({
  position: 'relative',
})

export const submenu = style({
  position: 'absolute',
  top: 0,
  left: '100%',
  zIndex: 1,
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.1s',
  selectors: {
    [`${parentItem}:hover &`]: {
      opacity: 1,
      pointerEvents: 'auto',
    },
  },
})
