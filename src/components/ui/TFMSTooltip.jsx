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
//  * - size: "sm" | "md" | "lg"
//  * - colorScheme: "neutral" | "brand" | "danger"
//  * - openOnClick: boolean (optional)  // if true, allow click to open
//  * - children: React element (asChild pattern)
//  * - contentProps, arrowProps, positionerProps: pass-thru props
//  *
//  * Usage (wrapper):
//  * <TFMSTooltip label="Edit" placement="top" offset={{ y: 6 }}>
//  *   <IconButton aria-label="edit" icon={<EditIcon />} />
//  * </TFMSTooltip>
//  *
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
  Text,
  useSlotRecipe
} from "@chakra-ui/react";
import { forwardRef } from "react";
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
    style: { position: "absolute" },
    ...positionerProps,
  };

  return (
    <ChakraTooltip.Root {...rest} positioning={positioning} delayDuration={delay}>
      <ChakraTooltip.Trigger asChild>
        {children}
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

export default TFMSTooltip;
