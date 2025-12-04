// // src/components/TFMSTooltip.jsx
// import {
//   Tooltip as ChakraTooltip,
//   Text,
//   useSlotRecipe
// } from "@chakra-ui/react";
// import { forwardRef } from "react";
// import tooltipRecipe from "../../theme/recipes/tooltip.recipe";

// /**
//  * TFMSTooltip (Wrapper pattern)
//  *
//  * Props:
//  * - label: string | ReactNode        // main tooltip content
//  * - placement: string                // "top" | "bottom" | "left" | "right" | "top-start" ...
//  * - offset: { x?: number, y?: number }  // pixel offsets: applied as sideOffset / alignOffset
  // Event-driven tooltip implementation (non-blocking for parent refs)
  // const slot = useSlotRecipe({ recipe: tooltipRecipe });
  // const classes = slot({ size, colorScheme });

  // const triggerRef = useRef(null);
  // // forwardRef support: attach forwarded ref to trigger DOM node
  // useEffect(() => {
  //   if (!ref) return;
  //   const node = triggerRef.current;
  //   if (typeof ref === "function") ref(node);
  //   else ref.current = node;
  // }, [ref]);

  // const [open, setOpen] = useState(false);
  // const openTimer = useRef(null);
  // const closeTimer = useRef(null);
  // const [pos, setPos] = useState({ left: 0, top: 0, transform: "translate(-50%, 0)" });

  // const clearTimers = () => {
  //   clearTimeout(openTimer.current);
  //   clearTimeout(closeTimer.current);
  // };

  // const computePosition = () => {
  //   const node = triggerRef.current;
  //   if (!node) return;
  //   const rect = node.getBoundingClientRect();
  //   const base = String(placement).split("-")[0];
  //   const sideOffset = (base === "top" || base === "bottom") ? (offset.y ?? 6) : (offset.x ?? 6);
  //   let left = 0;
  //   let top = 0;
  //   let transform = "translate(-50%, 0)";

  //   switch (base) {
  //     case "right":
  //       left = rect.right + sideOffset;
  //       top = rect.top + rect.height / 2;
  //       transform = "translate(0, -50%)";
  //       break;
  //     case "left":
  //       left = rect.left - sideOffset;
  //       top = rect.top + rect.height / 2;
  //       transform = "translate(-100%, -50%)";
  //       break;
  //     case "top":
  //       left = rect.left + rect.width / 2;
  //       top = rect.top - sideOffset;
  //       transform = "translate(-50%, -100%)";
  //       break;
  //     default:
  //     case "bottom":
  //       left = rect.left + rect.width / 2;
  //       top = rect.bottom + sideOffset;
  //       transform = "translate(-50%, 0)";
  //       break;
  //   }

  //   setPos({ left: Math.round(left), top: Math.round(top + window.scrollY), transform });
  // };

  // const handleOpen = (immediate = false) => {
  //   clearTimers();
  //   if (immediate) {
  //     computePosition();
  //     setOpen(true);
  //     return;
  //   }
  //   openTimer.current = setTimeout(() => {
  //     computePosition();
  //     setOpen(true);
  //   }, delay);
  // };

  // const handleClose = () => {
  //   clearTimers();
  //   closeTimer.current = setTimeout(() => setOpen(false), 50);
  // };

  // // Clone child and attach event handlers and ref
  // let triggerChild = null;
  // try {
  //   const only = React.Children.only(children);
  //   if (React.isValidElement(only)) {
  //     const childProps = only.props || {};
  //     triggerChild = cloneElement(only, {
  //       ref: triggerRef,
  //       onMouseEnter: (e) => {
  //         handleOpen(false);
  //         if (childProps.onMouseEnter) childProps.onMouseEnter(e);
  //       },
  //       onMouseLeave: (e) => {
  //         handleClose();
  //         if (childProps.onMouseLeave) childProps.onMouseLeave(e);
  //       },
  //       onFocus: (e) => {
  //         handleOpen(true);
  //         if (childProps.onFocus) childProps.onFocus(e);
  //       },
  //       onBlur: (e) => {
  //         handleClose();
  //         if (childProps.onBlur) childProps.onBlur(e);
  //       },
  //       onClick: (e) => {
  //         if (openOnClick) {
  //           computePosition();
  //           setOpen((s) => !s);
  //         }
  //         if (childProps.onClick) childProps.onClick(e);
  //       },
  //     });
  //   } else {
  //     triggerChild = only;
  //   }
  // } catch (e) {
  //   triggerChild = children;
  // }

  // // Cleanup timers on unmount
  // useEffect(() => () => clearTimers(), []);

  // return (
  //   <>
  //     {triggerChild}

  //     <Portal>
  //       {open && (
  //         <Box
  //           role="tooltip"
  //           className={typeof classes.content === "string" ? classes.content : "tfms-tooltip"}
  //           style={{
  //             position: "fixed",
  //             left: pos.left,
  //             top: pos.top,
  //             transform: pos.transform,
  //             zIndex: 9999,
  //             pointerEvents: "none",
  //           }}
  //           {...contentProps}
  //         >
  //           {typeof label === "string" ? <Text as="span">{label}</Text> : label}
  //           <Box as="span" data-part="arrow" />
  //         </Box>
  //       )}
  //     </Portal>
  //   </>
  // );
//  * Accessibility:
//  * - uses Tooltip.Trigger asChild so the wrapped child keeps focus roles/aria attributes
//  *
//  * Important:
//  * - Enforces position: "absolute" on Positioner (Chakra v3 Positioner supports it)
//  * - Arrow alignment handled by Chakra's Arrow + recipe-driven arrow styling
//  */
// const TFMSTooltip = forwardRef(function TFMSTooltip({
//   label,
//   placement = "top",
//   offset = { x: 0, y: 6 },
//   size = "md",
//   colorScheme = "brand",
//   openOnClick = false,
//   children,
//   contentProps = {},
//   arrowProps = {},
//   positionerProps = {},
//   delay = 100,
//   ...rest
// }, ref) {
//   // Convert the recipe object into a slot-recipe class generator using the
//   // Chakra hook, then call it with the variant props to get slot classNames.
//   const slot = useSlotRecipe({ recipe: tooltipRecipe });
//   const classes = slot({ size, colorScheme });
//   // Debug: log what the recipe returns so we can see if it's classNames or style objects
//   // (Remove or comment out in production)
//   // eslint-disable-next-line no-console
//   console.log("TFMSTooltip recipe classes:", classes);

//   // convert offset to chakra sideOffset/alignOffset:
//   // - For vertical placements (top/bottom) we pass sideOffset = offset.y and alignOffset = offset.x
//   // - For horizontal placements (left/right) we swap.
//   // Support placements like: "top", "bottom", "left", "right", and compound forms "top-start", "right-end", etc.
//   const basePlacement = String(placement).split("-")[0];
//   const vertical = basePlacement === "top" || basePlacement === "bottom";
//   const sideOffset = vertical ? (offset.y ?? 6) : (offset.x ?? 6);
//   const alignOffset = vertical ? (offset.x ?? 0) : (offset.y ?? 0);

//   // Build a `positioning` config for the underlying popper/tooltip.
//   // Use `gutter` for the main side offset and `offset.crossAxis` for alignment.
//   const positioning = {
//     placement,
//     gutter: sideOffset,
//     offset: { crossAxis: alignOffset }
//   };

//   // Enforce absolute positioning on Positioner via default props (can be overridden)
//   const enforcedPositionerProps = {
//     style: { position: "absolute" },
//     ...positionerProps,
//   };

//   return (
//     <ChakraTooltip.Root {...rest} positioning={positioning} delayDuration={delay}>
//       <ChakraTooltip.Trigger asChild>
//         {children}
//       </ChakraTooltip.Trigger>

//       <ChakraTooltip.Positioner {...enforcedPositionerProps}>
//         <ChakraTooltip.Content
//           // Always prefer the global `.tfms-tooltip` class from App.css for visuals.
//           // If the recipe returns a className string, prefer it; otherwise fall back
//           // to the known `tfms-tooltip` class so App.css rules apply exactly like NavBar.
//           className={
//   typeof classes.content === "string"
//     ? classes.content
//     : "tfms-tooltip"
// }

// {
//   ...(function () {
//     const [side = "bottom", align = "center"] = String(placement).split("-");
//     const gutter = typeof sideOffset === "number" ? `${sideOffset}px` : sideOffset;
//     const alignPx = typeof alignOffset === "number" ? `${alignOffset}px` : alignOffset;

//     const cssObj = {
//       position: "absolute",
//       zIndex: 9999,
//       pointerEvents: "none",
//     };

//     const setMain = (k, v) => (cssObj[k] = v);
//     const setAlign = (k, v) => (cssObj[k] = v);

//     // --- Main axis positioning ---
//     const mainMap = {
//       top:    () => setMain("bottom", `calc(100% + ${gutter})`),
//       bottom: () => setMain("top", `calc(100% + ${gutter})`),
//       left:   () => setMain("right", `calc(100% + ${gutter})`),
//       right:  () => setMain("left", `calc(100% + ${gutter})`)
//     };
//     (mainMap[side] || mainMap.bottom)();

//     // --- Cross-axis alignment ---
//     const centerMap = {
//       top:    () => (cssObj.transform = "translateX(-50%)"),
//       bottom: () => (cssObj.transform = "translateX(-50%)"),
//       left:   () => (cssObj.transform = "translateY(-50%)"),
//       right:  () => (cssObj.transform = "translateY(-50%)")
//     };

//     if (align === "center") {
//       if (side === "top" || side === "bottom") setAlign("left", "50%");
//       else setAlign("top", "50%");

//       centerMap[side]();

//       if (alignPx && alignPx !== "0px") {
//         cssObj.transform +=
//           side === "top" || side === "bottom"
//             ? ` translateY(${alignPx})`
//             : ` translateX(${alignPx})`;
//       }
//     } else {
//       // start / end
//       const key = (side === "top" || side === "bottom")
//         ? (align === "start" ? "left" : "right")
//         : (align === "start" ? "top" : "bottom");

//       setAlign(key, alignPx && alignPx !== "0px" ? `calc(0% + ${alignPx})` : 0);
//     }

//     return { css: { ...cssObj, ...(contentProps.css || {}) } };
//   })()
// }

//           {...contentProps}
//         >
//           {typeof label === "string" ? <Text as="span">{label}</Text> : label}

//           {/* Arrow: Chakra will position the arrow; use className if string, css if object */}
//           <ChakraTooltip.Arrow
//             // Ensure App.css arrow selectors match: add data-part attributes used by `.tfms-tooltip` rules
//             data-part="arrow"
//             data-part-tip="arrow-tip"
//             {...(typeof classes.arrow === "string" ? { className: classes.arrow } : {})}
//             {...arrowProps}
//           />
//         </ChakraTooltip.Content>
//       </ChakraTooltip.Positioner>
//     </ChakraTooltip.Root>
//   );
// });

// export default TFMSTooltip;


// src/components/TFMSTooltip.jsx
import {
  Tooltip as ChakraTooltip,
  Text,useSlotRecipe
} from "@chakra-ui/react";
import React, { cloneElement, forwardRef } from "react";
import tooltipRecipe from "../../theme/recipes/tooltip.recipe";

/**
 * TFMSTooltip (Wrapper pattern)
 *
 * Props:
 * - label: string | ReactNode        // main tooltip content
 * - placement: string                // "top" | "bottom" | "left" | "right" | "top-start" ...
 * - offset: { x?: number, y?: number }  // pixel offsets: applied as sideOffset / alignOffset
 * - size: "sm" | "md" | "lg"
 * - colorScheme: "neutral" | "brand" | "danger"
 * - openOnClick: boolean (optional)  // if true, allow click to open
 * - children: React element (asChild pattern)
 * - contentProps, arrowProps, positionerProps: pass-thru props
 *
 * Usage (wrapper):
 * <TFMSTooltip label="Edit" placement="top" offset={{ y: 6 }}>
 *   <IconButton aria-label="edit" icon={<EditIcon />} />
 * </TFMSTooltip>
 *
 * Accessibility:
 * - uses Tooltip.Trigger asChild so the wrapped child keeps focus roles/aria attributes
 *
 * Important:
 * - Enforces position: "absolute" on Positioner (Chakra v3 Positioner supports it)
 * - Arrow alignment handled by Chakra's Arrow + recipe-driven arrow styling
 */

const TFMSTooltip = forwardRef(function TFMSTooltip({
  label,
  placement = "top",
  offset = { x: 0, y: 6 },
  size = "md",
  colorScheme = "brand",
  openOnClick = false,
  children,
  contentProps = {},
  arrowProps = {},
  positionerProps = {},
  delay = 100,
  ...rest
}, ref) {
  // Convert the recipe object into a slot-recipe class generator using the
  // Chakra hook, then call it with the variant props to get slot classNames.
  const slot = useSlotRecipe({ recipe: tooltipRecipe });
  const classes = slot({ size, colorScheme });
  // Debug: log what the recipe returns so we can see if it's classNames or style objects
  // (Remove or comment out in production)
  // eslint-disable-next-line no-console
  //console.log("TFMSTooltip recipe classes:", classes);

  // convert offset to chakra sideOffset/alignOffset:
  // - For vertical placements (top/bottom) we pass sideOffset = offset.y and alignOffset = offset.x
  // - For horizontal placements (left/right) we swap.
  // Support placements like: "top", "bottom", "left", "right", and compound forms "top-start", "right-end", etc.
  const basePlacement = String(placement).split("-")[0];
  const vertical = basePlacement === "top" || basePlacement === "bottom";
  const sideOffset = vertical ? (offset.y ?? 6) : (offset.x ?? 6);
  const alignOffset = vertical ? (offset.x ?? 0) : (offset.y ?? 0);

  // Build a `positioning` config for the underlying popper/tooltip.
  // Use `gutter` for the main side offset and `offset.crossAxis` for alignment.
  const positioning = {
    placement,
    gutter: sideOffset,
    offset: { crossAxis: alignOffset }
  };

  // Enforce absolute positioning on Positioner via default props (can be overridden)
  const enforcedPositionerProps = {
    // style: { position: "absolute" },
    ...positionerProps,
  };

  // If a parent (like Menu.Trigger asChild) forwards a ref to this component,
  // ensure we forward that ref on to the actual DOM child so positioning libs
  // can measure it correctly. Clone the single child and attach the ref.
  let triggerChild = null;
  try {
    const only = React.Children.only(children);
    triggerChild = React.isValidElement(only) ? cloneElement(only, { ref }) : only;
  } catch (e) {
    // Fallback: if children missing or not valid, render as-is (no ref)
    triggerChild = children;
  }

  return (
    <ChakraTooltip.Root {...rest} positioning={positioning} delayDuration={delay}>
      <ChakraTooltip.Trigger asChild>
        {triggerChild}
      </ChakraTooltip.Trigger>

      <ChakraTooltip.Positioner {...enforcedPositionerProps}>
        <ChakraTooltip.Content
          // Always prefer the global `.tfms-tooltip` class from App.css for visuals.
          // If the recipe returns a className string, prefer it; otherwise fall back
          // to the known `tfms-tooltip` class so App.css rules apply exactly like NavBar.
          {...contentProps}
          className="tfms-tooltip"
	                  
        >
          {typeof label === "string" ? <Text as="span">{label}</Text> : label}

          {/* Arrow: Chakra will position the arrow; use className if string, css if object */}
          <ChakraTooltip.Arrow
            // Ensure App.css arrow selectors match: add data-part attributes used by `.tfms-tooltip` rules
            data-part="arrow"
            data-part-tip="arrow-tip"
            {...arrowProps}
          />
        </ChakraTooltip.Content>
      </ChakraTooltip.Positioner>
    </ChakraTooltip.Root>
  );
});

// import { useState } from "react";

// const TFMSTooltip = forwardRef(function TFMSTooltip(
//   {
//     label,
//     placement = "top",
//     offset = { x: 0, y: 6 },
//     delay = 100,
//     children,
//     ...rest
//   },
//   ref
// ) {
//   const [open, setOpen] = useState(false);

//   // Convert offset into Chakra positioning props
//   const basePlacement = String(placement).split("-")[0];
//   const vertical = basePlacement === "top" || basePlacement === "bottom";
//   const sideOffset = vertical ? (offset.y ?? 6) : (offset.x ?? 6);
//   const alignOffset = vertical ? (offset.x ?? 0) : (offset.y ?? 0);

//   const positioning = {
//     placement,
//     gutter: sideOffset,
//     offset: { crossAxis: alignOffset },
//   };

//   // Clone child: attach ref + hover/focus handlers
//   let triggerChild = null;
//   try {
//     const only = React.Children.only(children);
//     triggerChild = React.isValidElement(only)
//       ? cloneElement(only, {
//           ref,
//           onMouseEnter: () => setOpen(true),
//           onMouseLeave: () => setOpen(false),
//           onFocus: () => setOpen(true),
//           onBlur: () => setOpen(false),
//         })
//       : only;
//   } catch {
//     triggerChild = children;
//   }

//   return (
//     <>
//       {triggerChild}
//       <ChakraTooltip.Root
//         {...rest}
//         positioning={positioning}
//         open={open}
//         delayDuration={delay}
//       >
//         <ChakraTooltip.Positioner style={{ position: "absolute" }}>
//           <ChakraTooltip.Content className="tfms-tooltip">
//             {typeof label === "string" ? <Text as="span">{label}</Text> : label}
//             <ChakraTooltip.Arrow data-part="arrow" data-part-tip="arrow-tip" />
//           </ChakraTooltip.Content>
//         </ChakraTooltip.Positioner>
//       </ChakraTooltip.Root>
//     </>
//   );
// });

export default TFMSTooltip;
