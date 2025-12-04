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


import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import * as React from "react";

export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const {
    showArrow,
    children,
    disabled,
    portalled = true,
    content,
    contentProps,
    portalRef,
    positioning,
    ...rest
  } = props;

  if (disabled) return children;

  return (
    <ChakraTooltip.Root positioning={positioning}>
      <ChakraTooltip.Trigger asChild {...rest}>
        {children}
      </ChakraTooltip.Trigger>
      {/* Render Positioner without a Portal so the positioning engine can measure correctly. */}
      <ChakraTooltip.Positioner style={{ position: "absolute" }}>
        <ChakraTooltip.Content ref={ref} {...contentProps}>
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