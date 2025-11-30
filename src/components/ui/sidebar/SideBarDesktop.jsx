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
    const defaultRowStyles = itemSlot({ state: "default", expanded: expanded ? "true" : "false" });

    // Use `activeChild` variant when this child is the active route, otherwise use defaults
    const rowStyles = Active
      ? itemSlot({ state: "activeChild", expanded: expanded ? "true" : "false" })
      : defaultRowStyles;

    const iconStyles = iconSlot({ variant: Active ? "active" : "default" });

    // Normalize slot parts: the recipe may return className strings or style objects.
    const rowClass = typeof rowStyles.row === "string" ? rowStyles.row : undefined;
    const rowCss = typeof rowStyles.row === "object" ? { ...rowStyles.row, gap: "6px" } : { gap: "6px" };

    const iconWrapClass = typeof rowStyles.iconWrap === "string" ? rowStyles.iconWrap : undefined;
    const iconWrapCss = typeof rowStyles.iconWrap === "object" ? rowStyles.iconWrap : {};

    const labelClass = typeof rowStyles.label === "string" ? rowStyles.label : undefined;
    const labelCss = typeof rowStyles.label === "object" ? rowStyles.label : {};

    return (
      <TFMSTooltip key={child.id} label={child.label} placement="right" offset={{ x: 0, y: 0 }}>
        <Box
          as="button"
          {...(rowClass ? { className: rowClass } : { css: rowCss })}
          data-group="row"
          onClick={() => handleNavigate(child.to)}
        >
          <Box {...(iconWrapClass ? { className: iconWrapClass } : { css: iconWrapCss })}>
            {IconC ? (
              <IconC {...(typeof iconStyles.svg === "string" ? { className: iconStyles.svg } : { css: iconStyles.svg })} />
            ) : (
              <Box width="20px" height="20px" bg="brand.400" borderRadius="md" />
            )}
          </Box>

          {expanded && (
            <Text
              {...(labelClass ? { className: labelClass } : { css: { ...labelCss, flex: "unset", minWidth: "auto", width: "auto", whiteSpace: "nowrap", overflow: "visible", textOverflow: "unset", px: 1 } })}
            >
              {child.label}
            </Text>
          )}
        </Box>
      </TFMSTooltip>
    );
  };

  // ------------------------------------------------------------
  // Render Parent Item
  // ------------------------------------------------------------
  const renderParent = (parent) => {
  const ParentActive = parent.children.some((c) => isActiveRoute(c.to));
  const IconC = getIconByName(parent.icon);

  // Always fetch a reliable `default` style object (respects `expanded`)
  const defaultRowStylesParent = itemSlot({ state: "default", expanded: expanded ? "true" : "false" });

  // Use activeParent when any child route is active, otherwise fall back to default
  const rowStyles  = ParentActive
    ? itemSlot({ state: "activeParent", expanded: expanded ? "true" : "false" })
    : defaultRowStylesParent;

  const iconStyles  = iconSlot({ variant: ParentActive ? "active" : "default" });

  // Normalize row/slot outputs (className vs object)
  const rowClass = typeof rowStyles.row === "string" ? rowStyles.row : undefined;
  const rowCss = typeof rowStyles.row === "object" ? rowStyles.row : {};

  const iconWrapClass = typeof rowStyles.iconWrap === "string" ? rowStyles.iconWrap : undefined;
  const iconWrapCss = typeof rowStyles.iconWrap === "object" ? rowStyles.iconWrap : {};

  const labelClass = typeof rowStyles.label === "string" ? rowStyles.label : undefined;
  const labelCss = typeof rowStyles.label === "object" ? rowStyles.label : {};

  const indicatorClass = typeof rowStyles.indicator === "string" ? rowStyles.indicator : undefined;
  const indicatorCss = typeof rowStyles.indicator === "object" ? rowStyles.indicator : {};

  // Ensure trigger doesn't clip its contents when sidebar is expanded
  const triggerCss = { ...rowCss, overflow: expanded ? "visible" : rowCss?.overflow };

  // Compute the styles for the `activeParent` state so we can attach them
  // to the trigger's `_open` pseudo-prop (applies when the Accordion item is open).
  const activeParentRow = itemSlot({ state: "activeParent", expanded: expanded ? "true" : "false" }).row;
  const activeParentStylesObj = typeof activeParentRow === "object" ? activeParentRow : undefined;

  return (
    <Accordion.Item key={parent.id} value={parent.value}>

      {/* Do NOT pass row styles directly to ItemTrigger */}
      <TFMSTooltip label={parent.label} placement="right" offset={{ x: 0, y: 0 }}>
        <Accordion.ItemTrigger
          {...(rowClass ? { className: rowClass } : { css: triggerCss })}
          // Always apply the `activeParent` styles when the Accordion item is open (only if we have an object)
          {...(activeParentStylesObj ? { _open: activeParentStylesObj } : {})}
          data-group="row"
        >
          <Box {...(iconWrapClass ? { className: iconWrapClass } : { css: iconWrapCss })}>
            {IconC ? (
              <Box as={IconC} {...(typeof iconStyles.svg === "string" ? { className: iconStyles.svg } : { css: iconStyles.svg })} />
            ) : (
              <Box width="20px" height="20px" bg="gray.400" borderRadius="md" />
            )}
          </Box>

          {expanded && (
            <Text {...(labelClass ? { className: labelClass } : { css: labelCss })}>
              {parent.label}
            </Text>
          )}

          <Accordion.ItemIndicator {...(indicatorClass ? { className: indicatorClass } : { css: indicatorCss })}>
            <FiChevronDown />
          </Accordion.ItemIndicator>

        </Accordion.ItemTrigger>
      </TFMSTooltip>

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
  const containerClass = typeof sidebarStyles.container === "string" ? sidebarStyles.container : undefined;
  const containerCss = typeof sidebarStyles.container === "object" ? sidebarStyles.container : {};

  const scrollClass = typeof sidebarStyles.scroll === "string" ? sidebarStyles.scroll : undefined;
  const scrollCss = typeof sidebarStyles.scroll === "object" ? sidebarStyles.scroll : {};

  const toggleClass = typeof sidebarStyles.toggle === "string" ? sidebarStyles.toggle : undefined;
  const toggleCss = typeof sidebarStyles.toggle === "object" ? sidebarStyles.toggle : {};

  return (
    <Box
      {...(containerClass ? { className: containerClass } : { css: containerCss })}
    >

      {/* Menu */}
      <Box {...(scrollClass ? { className: scrollClass } : { css: scrollCss })} >
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
              {...(toggleClass ? { className: toggleClass } : { css: toggleCss })}
            >
                {expanded ? <LuPanelLeftClose /> : <LuPanelRightClose />}
            </Box>
          </TFMSTooltip>

        </Accordion.Root> 
      </Box>  
    </Box>
  );
}