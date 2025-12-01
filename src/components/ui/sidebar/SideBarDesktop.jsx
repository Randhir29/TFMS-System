// src/ui/sidebar/SidebarDesktop.jsx


import {
  Accordion,
  Box,
  Text,
  useRecipe
} from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";

import { FiChevronDown } from "react-icons/fi";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

import sidebarRecipe from "../../../theme/recipes/sidebar.recipe";
import sidebarIconRecipe from "../../../theme/recipes/sidebarIcon.recipe";
import sidebarItemRecipe from "../../../theme/recipes/sidebarItem.recipe";
import TFMSTooltip from "../TFMSTooltip";

import * as LucideIcons from "react-icons/lu";
import menuData from "../../../utils/data.json";

// ------------------------------------------------------------
// Constants
// ------------------------------------------------------------
const HOVER_DELAY_MS = 120;
const HOVER_COLLAPSE_DELAY_MS = 250;

// ------------------------------------------------------------
// Icon Resolver
// ------------------------------------------------------------
function getIconByName(name) {
  return LucideIcons[name] || null;
}
// ------------------------------------------------------------
// Component: SidebarDesktop
// ------------------------------------------------------------
export default function SidebarDesktop() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);
 // const [pinned, setPinned] = useState(false);
  const [expandedHover, setExpandedHover] = useState(false);

  const expanded = !collapsed || expandedHover;
  // console.log("SideBar extended state:", expanded);

  const [openItems, setOpenItems] = useState([]);

  const enterTimer = useRef(null);
  const leaveTimer = useRef(null);

  // ------------------------------------------------------------
  // Recipe Slot Hooks
  // ------------------------------------------------------------
  const sidebarSlot = useRecipe({ recipe: sidebarRecipe });
  const itemSlot = useRecipe({ recipe: sidebarItemRecipe });
  const iconSlot = useRecipe({ recipe: sidebarIconRecipe });

  // console.log(Object.keys(LucideIcons).filter(k => k.includes("Panel")));

  // Call the recipe function with current props to get the specific style objects for each part

  const sidebarStyles = sidebarSlot({
    size: expanded ? "expanded" : "collapsed",
  });

  const sideBarToogleButtonStyles = itemSlot({ state: "default" });
  // ------------------------------------------------------------
  // Active route check
  // ------------------------------------------------------------
  const isActiveRoute = (to) => {
    if (!to) return false;
    return (
      location.pathname === to || location.pathname.startsWith(to)
    );
  };
  // ------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------
  const handleNavigate = useCallback(
    (to) => {
      if (!to) return;
      navigate(to);
    },
    [navigate]
  );
  //---------------------------------------------------------------------
  // Helpers: inspect & sanitize recipe outputs so layout props don't override/duplicate
  //---------------------------------------------------------------------
// const pickVisualProps = (obj = {}, { allowColor = true } = {}) => {
//   // Return only a small safe whitelist of truly visual properties.
//   // This prevents layout/spacing/typography props (gap, padding*, display, width, fontSize, cursor, etc.)
//   // from being re-applied to a wrapper like Accordion.ItemTrigger._open.
//   if (typeof obj !== "object" || obj == null) return obj;
//   const {
//     // explicitly omit common layout/spacing/typography keys that recipes may return
    
//     display, width, gap,
//     px, py, p, padding, paddingLeft, paddingRight, paddingTop, paddingBottom,
//     paddingBlock, paddingInline, paddingInlineStart, paddingInlineEnd,
//     ml, mr, mt, mb, // margins
//     minHeight, minWidth, maxWidth, height,
//     fontSize, fontWeight, lineHeight, letterSpacing,
//     cursor, overflow, alignItems, justifyContent,
//     // keep rest for inspection below
//     ...rest
//   } = obj;
 
//   // Visual whitelist - only these keys will be returned (unless allowColor=false then remove color/bg)
//   const visualKeys = new Set([
//     "bg", "background", "backgroundColor",
//     "border", "borderColor", "borderRadius",
//     "boxShadow", "opacity", "transform",
//     "filter", "backdropFilter", "outline",
//     // keep subtle extras you consider visual (but not layout/typography)
//     "borderStyle", "borderWidth"
//   ]);

//    const safe = {};
//   // also keep any other non-layout props (e.g. textDecoration)
//   Object.keys(rest).forEach((k) => {
//     if (visualKeys.has(k)) safe[k] = rest[k];
//   });

//   // optionally block color/bg completely to avoid color overrides
//   if (!allowColor) {
//     delete safe.bg;
//     delete safe.background;
//     delete safe.backgroundColor;
//     delete safe.color;
//   } else {
//     // allow color explicitly if present in rest
//     if (rest.color !== undefined) safe.color = rest.color;
//   }

//   return safe;
// };
//---------------------------------------------------------------------

// const debugRecipe = (label, obj) => {
//   // small safe log for debugging in dev only
//   try {
//     // eslint-disable-next-line no-console
//     console.log(`[TFMS][recipe:${label}]`, obj);
//   } catch (e) {}
// };
//----------------------------------------------------------------------------
  // ------------------------------------------------------------
  // Hover expand logic
  // ------------------------------------------------------------
  // const onMouseEnter = () => {
  //   if (pinned) return;
  //   clearTimeout(leaveTimer.current);
  //   enterTimer.current = setTimeout(
  //     () => setExpandedHover(true),
  //     HOVER_DELAY_MS
  //   );
  // };

  // const onMouseLeave = () => {
  //   if (pinned) return;
  //   clearTimeout(enterTimer.current);
  //   leaveTimer.current = setTimeout(() => {
  //     setExpandedHover(false);
  //     setOpenItems([]);
  //   }, HOVER_COLLAPSE_DELAY_MS);
  // };

    const onClickToogleBtn = () => {
      setExpandedHover(prev => {
          if (prev) {
          setOpenItems([]);   // collapse items when closing
      }
       return !prev;         // toggle true/false
     });
    };

  // ------------------------------------------------------------
  // Render Child Item
  // ------------------------------------------------------------
  const renderChild = (child) => {
    const Active = isActiveRoute(child.to);
    const IconC = getIconByName(child.icon);

    // Always fetch the `default` row styles from the recipe (respecting `expanded`) so
    // we have a reliable fallback even if the recipe returns classNames or objects.

    // applied style defaultRowStyles is of type object
    // const defaultRowStyles = itemSlot({ state: "default", expanded: expanded ? "true" : "false" }); 


    // Use `activeChild` variant when this child is the active route, otherwise use defaults
    //applied style rowStyles is of type of Object

      const rowStyles = itemSlot({
       state: Active ? "activeChild" : "default",
       expanded: expanded ? "true" : "false",
      });

    // applied style iconStyles is of type Object
    const iconStyles = iconSlot({ variant: Active ? "active" : "default" });

    // Normalize slot parts: the recipe may return className strings or style objects.

    //rowStyles.row is of type Object

    // const rowCss = { ...rowStyles.row };

    // console.log(`Rendered Child is ${child.label} :--- and applied style is of type ${typeof( rowCss)} `);


    //rowStyles.iconWrap is of type Object
    // const iconWrapCss = rowStyles.iconWrap;

    //rowStyles.label is of type Object
    // const labelCss =  rowStyles.label;


    return (
      <Box 
        key={child.id}
        as="button"
        css={rowStyles.row}
        data-group="row"
        onClick={() => handleNavigate(child.to)}
        >
        
          {/* <Box
            as="button"
            css={rowCss}
            data-group="row"
            onClick={() => handleNavigate(child.to)}
          > */}
            <Box css={rowStyles.iconWrap}>
              {IconC ? (
                <IconC css={iconStyles.svg} />
              ) : (
                <Box width="1.5rem" height="1.5rem" bg="brand.400" borderRadius="md" />
              )}
            </Box>
        
          {expanded && (
            <TFMSTooltip key={child.id} label={child.label} placement="bottom" offset={{ x: 6, y: 0 }} size="sm">
            <Text
              // `` css={{ ...labelCss, flex: "unset", minWidth: "auto", width: "auto", whiteSpace: "nowrap", overflow: "visible", textOverflow: "unset", px: 1 }}
            >
              {child.label}
            </Text>
            </TFMSTooltip>
          )}
      </Box>
    );
  };

  // ------------------------------------------------------------
  // Render Parent Item
  // ------------------------------------------------------------
  const renderParent = (parent) => {
  const ParentActive = parent.children.some((c) => isActiveRoute(c.to));
  const IconC = getIconByName(parent.icon);

  // Always fetch a reliable `default` style object (respects `expanded`)
  // const defaultRowStylesParent = itemSlot({ state: "default", expanded: expanded ? "true" : "false" });

  // Use activeParent when any child route is active, otherwise fall back to default
  
  const rowStyles = itemSlot({
    state: ParentActive ? "activeParent" : "default",
    expanded: expanded ? "true" : "false",
  });
 
  const iconStyles  = iconSlot({ variant: ParentActive ? "active" : "default" });

  //  console.log(`Rendered Parent is ${parent.label} and applied style is ${typeof(rowStyles)} :--- and Parent Active Status is :---${ParentActive}`);


  // Normalize
  // const rowCss =  rowStyles.row;
  // const iconWrapCss =  rowStyles.iconWrap;
  // const labelCss =rowStyles.label;
  // const indicatorCss = rowStyles.indicator;

  // ---- DEBUG: inspect what recipe returns (layout + visual) ----
    // debugRecipe(`parent.row (${parent.label})`, rowCss);
    // debugRecipe(`parent.indicator (${parent.label})`, indicatorCss);
    // // ----------------------------------------------------------------

  //  console.log(`Rendered Parent is ${parent.label} :--- and applied style is of type ${typeof( indicatorCss)} and Parent Active Status is :---${ParentActive}`);

  // Sanitize open styles: keep only visual props (avoid reapplying padding/display/margins)
    // const activeParentRowRaw = itemSlot({ state: "activeParent", expanded: expanded ? "true" : "false" }).row;
    // const activeParentRow = pickVisualProps(activeParentRowRaw);
    // debugRecipe(`parent._open sanitized (${parent.label})`, activeParentRow);

  // Use explicit flex container for trigger internal layout (left-group + indicator)
    // const triggerCss = {
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "space-between",
    //   gap: 8,
    //   width: "100%",
    //   // apply non-layout visual props from rowCss safely
    //   ...pickVisualProps(rowCss),
    //   overflow: expanded ? "visible" : rowCss?.overflow,
    // };

  // console.log(itemSlot);


  // Compute the styles for the `activeParent` state so we can attach them
  // to the trigger's `_open` pseudo-prop (applies when the Accordion item is open).
//   - Function call
// - itemSlot({...}) is being invoked.
// - Arguments passed
// - state: "activeParent" → This is a flag/identifier telling the slot which state it represents.
// - expanded: expanded ? "true" : "false" → This is a conditional expression:
// - If the variable expanded is truthy → "true"
// - Otherwise → "false"
//- Property access
//- .row → After itemSlot(...) returns an object, you’re accessing its row property.

  // const activeParentRow = itemSlot({ state: "activeParent", expanded: expanded ? "true" : "false" }).row;

  // console.log(`Rendered Parent is ${parent.label} :--- and Parent Active Status is :---${ParentActive}`);

  // console.log("Active Parent Row Styles:", activeParentRow);

  return (
    <Accordion.Item key={parent.id} value={parent.value}>

      {/* Do NOT pass row styles directly to ItemTrigger */}
      <Accordion.ItemTrigger
        css= {rowStyles.row}
         _open={ParentActive ? itemSlot({ state: "activeParent", expanded: expanded ? "true" : "false" }).row : undefined}
         data-group="row"
        >  
          {/* <Box> */}
            {/* <Box css={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
                <Box css={iconWrapCss}>
                  {IconC ? (
                    <Box as={IconC} css={iconStyles.svg} />
                  ) : (
                    <Box width="20px" height="20px" bg="gray.400" borderRadius="md" />
                  )}
                </Box> */}
             <Box css={rowStyles.iconWrap}>
                {!expanded ? (
                  <TFMSTooltip label={parent.label} placement="right-start"  offset={{ x:8, y: 0}}>
                    {IconC ? <Box as={IconC} css={iconStyles.svg} /> : <Box width="20px" height="20px" bg="gray.400" borderRadius="md" />}
                  </TFMSTooltip>
                ) : (
                  IconC ? <Box as={IconC} css={iconStyles.svg} /> : <Box width="20px" height="20px" bg="gray.400" borderRadius="md" />
                )}
            </Box>

            {expanded && (
              <TFMSTooltip label={parent.label} placement="bottom" offset={{ x: 0, y: 0 }} size="sm">
                  <Text css={rowStyles.label}>
                {parent.label}
              </Text>
              </TFMSTooltip>
            )}
            {/* </Box> */}
            {!expanded ? (
              <TFMSTooltip label={parent.label} placement="right-start" offset={{ x: 8, y: 0 }}>
                <Accordion.ItemIndicator css={rowStyles.indicator}>
                  <FiChevronDown />
                </Accordion.ItemIndicator>
              </TFMSTooltip>
                 ) : (
              <Accordion.ItemIndicator css={rowStyles.indicator}>
                <FiChevronDown />
              </Accordion.ItemIndicator>
            )}

            {/* </Box> */}
        {/* </TFMSTooltip> */}

      </Accordion.ItemTrigger>

      <Accordion.ItemContent>
        {parent.children.map(renderChild)}
      </Accordion.ItemContent>

    </Accordion.Item>
  );
};

  // ------------------------------------------------------------
  // Render Sidebar
  // ------------------------------------------------------------
  // Normalize sidebar slot outputs (className vs style objects)

  const containerCss =  sidebarStyles.container;
  const scrollCss = sidebarStyles.scroll;
  const toggleCss = sidebarStyles.toggle;

  return (
    <Box
      css={containerCss}
    >

      {/* Menu */}
      <Box css={scrollCss} >
        <Accordion.Root 
          // Use uncontrolled Accordion for desktop to avoid complexity
          // with switching between `single` and `multiple` controlled modes.
          // This mirrors the working mobile implementation and lets the
          // Accordion manage open state automatically on clicks.
          style={{ display: "block" }}
          value={openItems}
          onValueChange={
            (e) => {
            console.log("Next accordion value:", e.value);
            setOpenItems(e.value);
            }
          }
          multiple    
          defaultValue={[]}
        >
          {menuData.menuItems.map(renderParent)}
          {/* SideBar Toggle Switch*/}
          <TFMSTooltip
            label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            placement="right"
            offset={{ x: 0, y: 0 }}
          >
            <Box
              as="button"
              onClick={onClickToogleBtn}
              aria-label="Toggle sidebar"
              css={toggleCss}
            >
                {expanded ? <LuPanelLeftClose /> : <LuPanelRightClose />}
            </Box>
          </TFMSTooltip>

        </Accordion.Root> 
      </Box>  
    </Box>
  );
}