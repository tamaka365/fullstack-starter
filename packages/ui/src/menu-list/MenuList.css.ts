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

export const expandIcon = style({
  marginInlineStart: 'auto',
  flexShrink: 0,
  fontSize: '0.625rem',
  transition: 'transform 0.2s ease',
  // reset button defaults
  appearance: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  color: 'inherit',
})

export const expandIconOpen = style({
  transform: 'rotate(90deg)',
})
