import { style } from '@vanilla-extract/css'

/** 应用内容根容器 */
export const appRoot = style({
  position: 'relative',
})

/** 浮层全局挂载点，无视觉尺寸，position relative 建立独立层叠上下文 */
export const portalRoot = style({
  position: 'relative',
})
