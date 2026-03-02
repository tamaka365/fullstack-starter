'use client'

import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset as offsetMiddleware,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'
import { useCallback, useState } from 'react'
import type { PopoverProps } from './types'
import { usePortalRoot } from '../ui-provider/UIProvider'

/**
 * Popover — 通用浮层原语
 *
 * 负责浮层定位、触发逻辑和动画，不内置任何业务内容。
 * 调用方通过 `trigger` render prop 指定触发元素，通过 `content` prop 注入浮层内容。
 *
 * - `trigger` render prop：调用方主动 spread props（含 ref），无 cloneElement 风险
 * - `triggers` 支持 hover / click / focus 任意组合，click/focus 自动启用 dismiss
 * - 使用 `@floating-ui/react` 计算位置，自动处理 flip / shift 边界检测
 * - `safePolygon` 在 anchor 与浮层之间建立安全区（仅 hover 模式）
 * - 优先挂载到 UIProvider 的 portalRoot，未包裹时退回 document.body
 * - `useTransitionStyles` 根据实际弹出方向生成位移动画
 *
 * @example
 * ```tsx
 * <Popover
 *   trigger={(props) => <button {...props}>触发</button>}
 *   content={<MenuList items={items} />}
 *   placement="right-start"
 * />
 * ```
 */
export function Popover({
  trigger,
  content,
  placement = 'right-start',
  offset = 8,
  open: controlledOpen,
  onOpenChange,
  triggers = 'hover',
  openDelay = 100,
  closeDelay = 0,
}: PopoverProps) {
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const open = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const portalRoot = usePortalRoot()

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement,
    middleware: [offsetMiddleware(offset), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  const hasHover = triggers === 'hover'
  const hasClick = triggers === 'click'
  const hasFocus = triggers === 'focus'
  const hasDismiss = !hasHover

  const hover = useHover(context, {
    enabled: hasHover,
    delay: { open: openDelay, close: closeDelay },
    handleClose: hasHover ? safePolygon() : undefined,
  })
  const click = useClick(context, { enabled: hasClick })
  const focus = useFocus(context, { enabled: hasFocus })
  const dismiss = useDismiss(context, { enabled: hasDismiss })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, focus, dismiss])

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 150, close: 100 },
    initial: ({ side }) => ({
      opacity: 0,
      transform: {
        top: 'translateY(4px)',
        bottom: 'translateY(-4px)',
        left: 'translateX(4px)',
        right: 'translateX(-4px)',
      }[side],
    }),
  })

  return (
    <>
      {trigger({ ref: refs.setReference, ...getReferenceProps() })}
      {isMounted && (
        <FloatingPortal root={portalRoot ?? undefined}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <div style={transitionStyles}>{content}</div>
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
