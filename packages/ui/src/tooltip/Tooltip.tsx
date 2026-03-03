'use client'

import React from 'react'
import { Popover } from '../popover/Popover'
import type { TriggerProps } from '../popover/types'
import * as styles from './Tooltip.css'
import type { TooltipProps } from './types'

export function Tooltip({
  content,
  children,
  placement = 'top',
  openDelay,
  closeDelay,
  disabled,
}: TooltipProps) {
  if (disabled) return children

  return (
    <Popover
      placement={placement}
      triggers="hover"
      openDelay={openDelay}
      closeDelay={closeDelay}
      content={<div className={styles.tooltipContent}>{content}</div>}
      trigger={(props: TriggerProps) => React.cloneElement(children, props)}
    />
  )
}
