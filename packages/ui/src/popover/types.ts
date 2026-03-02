import type { Placement } from '@floating-ui/react'
import type React from 'react'

export type { Placement }

/** Popover 触发方式 */
export type PopoverTrigger = 'hover' | 'click' | 'focus'

/**
 * trigger render prop 接收的 props 类型
 *
 * 使用 `Record<string, unknown>` 是因为 floating-ui `getReferenceProps` 的返回类型
 * 在上游未精确声明，此处为合理折中；调用方直接 spread 即可，无需关心具体属性。
 */
export type TriggerProps = { ref: React.RefCallback<Element> } & Record<string, unknown>

/**
 * Popover 通用浮层组件 props
 *
 * @example
 * ```tsx
 * <Popover
 *   trigger={(props) => <button {...props}>触发</button>}
 *   content={<SomePanel />}
 *   placement="right-start"
 * />
 * ```
 */
export interface PopoverProps {
  /**
   * trigger render prop：接收包含 ref 和事件处理器的 props 对象，
   * 调用方主动 spread 到目标元素，确保 ref 和事件正确注入
   */
  trigger: (props: TriggerProps) => React.ReactElement
  /** 浮层内容，调用方完全控制 */
  content: React.ReactNode
  /**
   * 浮层相对 anchor 的方位，支持 floating-ui 全部 12 个方向
   * @default 'right-start'
   */
  placement?: Placement
  /**
   * 浮层与 anchor 的间距（px）
   * @default 8
   */
  offset?: number
  /** 受控 open 状态；不传则内部维护 */
  open?: boolean
  /** 受控时的状态变更回调 */
  onOpenChange?: (open: boolean) => void
  /**
   * 触发方式，三选一
   * @default 'hover'
   */
  triggers?: PopoverTrigger
  /**
   * hover 显示延迟（ms），防止鼠标掠过误触；仅 triggers 含 'hover' 时生效
   * @default 100
   */
  openDelay?: number
  /**
   * hover 隐藏延迟（ms）；退出动画本身已有 100ms，通常设为 0 即可；
   * 仅 triggers 含 'hover' 时生效
   * @default 0
   */
  closeDelay?: number
}
