import { style } from '@vanilla-extract/css'

export const list = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
})

// group 与 list 样式相同，共用同一 class
export const group = list

export const groupLabel = style({
  padding: '8px 12px 4px',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'currentColor',
  opacity: 0.5,
  userSelect: 'none',
})

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  paddingInlineStart: 'calc(var(--menu-level, 0) * 16px)',
  cursor: 'pointer',
  userSelect: 'none',
  selectors: {
    '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: -2 },
  },
})

export const itemActive = style({
  background: 'rgba(0, 0, 0, 0.08)',
})

export const itemDisabled = style({
  opacity: 0.4,
  pointerEvents: 'none',
})

export const icon = style({
  display: 'flex',
})


export const expandIcon = style({
  marginInlineStart: 'auto',
  flexShrink: 0,
  transition: 'transform 0.2s ease',
  display: 'flex',
})

export const expandIconOpen = style({
  transform: 'rotate(90deg)',
})

export const itemLink = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  // reset <button> defaults
  appearance: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  font: 'inherit',
  cursor: 'inherit',
  textAlign: 'left',
  // reset <a> defaults
  color: 'inherit',
  textDecoration: 'none',
})
