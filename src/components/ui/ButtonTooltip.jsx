import { Tooltip as ChakraTooltip } from '@chakra-ui/react'
import * as React from 'react'

/**
 * ButtonTooltip
 *
 * Reusable tooltip wrapper intended for Buttons / IconButtons.
 * - `children` should be a Button or IconButton element (or any interactive element)
 * - `content` can be a string or a React node
 * - `placement` controls where the tooltip appears (top, bottom, left, right, etc.)
 * - `contentProps` lets you pass style props that will be applied to the tooltip content
 *   NOTE: `position: 'absolute'` is enforced on the contentProps as required.
 * - Falls back to a native `title` attribute if Chakra Tooltip is not available.
 *
 * Example:
 * <ButtonTooltip content="Logout" placement="bottom">
 *   <Button aria-label="Logout"><Icon as={FiLogOut} /></Button>
 * </ButtonTooltip>
 */
export default function ButtonTooltip({
  children,
  content,
  placement = 'bottom',
  showArrow = true,
  openDelay = 160,
  closeDelay = 80,
  contentProps = {},
  tooltipProps = {},
  disabled = false,
}) {
  if (disabled) return children

  // Enforce absolute positioning for tooltip content as required by design.
  const enforcedContentProps = { position: 'absolute', ...contentProps }

  // Defensive: if Chakra Tooltip is not present, use a native title fallback.
  if (!ChakraTooltip) {
    return React.cloneElement(children, { title: typeof content === 'string' ? content : undefined })
  }

  return (
    <ChakraTooltip
      label={content}
      hasArrow={showArrow}
      placement={placement}
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...tooltipProps}
      {...enforcedContentProps}
    >
      {children}
    </ChakraTooltip>
  )
}
