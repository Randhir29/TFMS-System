// import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
// import * as React from "react";

// export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
//   const {
//     showArrow,
//     children,
//     disabled,
//     portalled = true,
//     content,
//     contentProps,
//     portalRef,
//     positioning,
//     // everything else should be forwarded to the trigger element
//     ...forwardToTrigger
//   } = props;

//   if (disabled) return children;

//   // Ensure there's a single React element child we can clone to attach trigger props/ref
//   const child = React.Children.only(children);
//   const trigger = React.cloneElement(child, { ...forwardToTrigger, ref });

//   return (
//     <ChakraTooltip.Root positioning={positioning}>
//       <ChakraTooltip.Trigger asChild>{trigger}</ChakraTooltip.Trigger>

//       {/* Render Positioner without portal so the positioning engine can measure correctly.
//           Enforce absolute positioning to avoid fallback at (0,0). */}
//       <ChakraTooltip.Positioner style={{ position: "absolute" }}>
//         <ChakraTooltip.Content {...contentProps}>
//           {showArrow && (
//             <ChakraTooltip.Arrow>
//               <ChakraTooltip.ArrowTip />
//             </ChakraTooltip.Arrow>
//           )}
//           {content}
//         </ChakraTooltip.Content>
//       </ChakraTooltip.Positioner>
//     </ChakraTooltip.Root>
//   );
// });


// import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
// import * as React from "react";

// export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
//   const {
//     showArrow,
//     children,
//     disabled,
//     portalled = true,
//     content,
//     contentProps,
//     portalRef,
//     positioning,
//     ...rest
//   } = props;

//   if (disabled) return children;

//   const defaultContentProps = {
//     px: 2,
//     py: 1,
//     bg: "gray.700",
//     color: "white",
//     borderRadius: "sm",
//     fontSize: "sm",
//     boxShadow: "md",
//     ...((contentProps && typeof contentProps === "object") ? {} : {}),
//   };

//   const mergedContentProps = { ...defaultContentProps, ...(contentProps || {}) };

//   return (
//     <ChakraTooltip.Root positioning={positioning}>
//       <ChakraTooltip.Trigger asChild {...rest}>
//         {children}
//       </ChakraTooltip.Trigger>
//       {/* Render Positioner without a Portal so the positioning engine can measure correctly. */}
//       <ChakraTooltip.Positioner style={{ position: "absolute" }}>
//         <ChakraTooltip.Content ref={ref} {...mergedContentProps}>
//           {showArrow && (
//             <ChakraTooltip.Arrow>
//               <ChakraTooltip.ArrowTip />
//             </ChakraTooltip.Arrow>
//           )}
//           {content}
//         </ChakraTooltip.Content>
//       </ChakraTooltip.Positioner>
//     </ChakraTooltip.Root>
//   );
// });
import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import * as React from "react";

/**
 * TFMS Tooltip wrapper for Chakra v3 primitives.
 *
 * - Does NOT forward arbitrary props blindly to the trigger DOM node.
 * - Merges TFMS CSS class `tfms-tooltip` onto the Tooltip.Content so your styles apply.
 * - Renders Positioner in-place (so measurement works).
 */
export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const {
    showArrow,
    children,
    disabled,
    // we accept these so callers can pass them but we won't forward dangerous ones to the DOM:
    content,
    contentProps,
    positioning,
    // layout/positioning props that must NOT be forwarded to DOM elements:
    sideOffset, // intentionally captured so it won't end up on a DOM node
    offset,
    align,
    // everything else that should go to the trigger element (we'll sanitize)
    ...rest
  } = props;

  if (disabled) return children;

  // Default visual content props (you can tweak to use theme tokens)
  // const defaultContentProps = {
  //   px: 2,
  //   py: 1,
  //   bg: "gray.700",
  //   color: "white",
  //   borderRadius: "sm",
  //   fontSize: "sm",
  //   boxShadow: "md",
  //   // don't include className here - we merge below
  // };

  // merge className so your .tfms-tooltip class is applied
  const providedClassName = contentProps && contentProps.className;
  const mergedContentProps = {
    ...(contentProps || {}),
    className: ["tfms-tooltip", providedClassName].filter(Boolean).join(" "),
  };

  // Sanitize trigger props: avoid passing internal/positioning props to DOM.
  // Only forward props that are intended for the trigger element.
  // You can add or remove keys from the allowlist below as needed.
  const triggerAllowlist = [
    "id",
    "aria-label",
    "aria-describedby",
    "onClick",
    "onMouseEnter",
    "onMouseLeave",
    "onFocus",
    "onBlur",
    "style",
    "className",
    "title",
    "type",
    "tabIndex",
  ];

  const triggerProps = {};
  Object.keys(rest).forEach((k) => {
    if (triggerAllowlist.includes(k)) triggerProps[k] = rest[k];
  });

  // Ensure there's a single child element we can attach ref/props to.
  const child = React.Children.only(children);
  const trigger = React.cloneElement(child, { ...triggerProps, ref });

  return (
    <ChakraTooltip.Root positioning={positioning}>
      {/* asChild so the Chakra trigger will wrap the supplied trigger element */}
      <ChakraTooltip.Trigger asChild>{trigger}</ChakraTooltip.Trigger>

      {/* Render Positioner without portal so the positioning engine can measure the trigger */}
      <ChakraTooltip.Positioner style={{ position: "absolute" }}>
        <ChakraTooltip.Content ref={ref} {...mergedContentProps}>
          {showArrow && (
            <ChakraTooltip.Arrow>
              <ChakraTooltip.ArrowTip />
            </ChakraTooltip.Arrow>
          )}
          {content}
        </ChakraTooltip.Content>
      </ChakraTooltip.Positioner>
    </ChakraTooltip.Root>
  );
});