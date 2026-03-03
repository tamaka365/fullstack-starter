import type { Placement } from '@floating-ui/react'
import type React from 'react'

export interface TooltipProps {
  /** tooltip 显示内容 */
  content: React.ReactNode
  /**
   * 触发元素，必须是单个可接受 ref 的 React 元素。
   * 原生 DOM 元素直接支持；自定义组件需 `React.forwardRef` 转发 ref。
   */
  children: React.ReactElement
  /**
   * 浮层方位
   * @default 'top'
   */
  placement?: Placement
  /**
   * 显示延迟（ms）
   * @default 100
   */
  openDelay?: number
  /**
   * 隐藏延迟（ms）
   * @default 0
   */
  closeDelay?: number
  /**
   * 禁用时直接渲染 children，不挂载 Popover
   * @default false
   */
  disabled?: boolean
}
