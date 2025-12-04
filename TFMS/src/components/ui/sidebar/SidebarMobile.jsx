// src/ui/sidebar/SidebarMobile.jsx
// ============================================================================
// PURPOSE OF THIS FILE
// ----------------------------------------------------------------------------
// This component renders the **mobile-only** sidebar using Chakra UI v3's
// Drawer primitive set. It follows EXACTLY the required structure:
//
// Drawer.Root
//   Drawer.Trigger
//   Portal
//     Drawer.Backdrop
//     Drawer.Positioner
//       Drawer.Content
//         Drawer.Header
//           Drawer.Title
//         Drawer.Body
//           Accordion.Root
//             Accordion.Item (menu parent)
//               Accordion.ItemTrigger
//               Accordion.ItemIndicator
//               Accordion.ItemContent (children list)
//         Drawer.Footer
//         Drawer.CloseTrigger (bottom close button)
//
// WORKFLOW CONTEXT:
// - This component is mounted only when viewport < md breakpoint.
// - The desktop sidebar is SidebarDesktop.jsx (separate).
// - It uses theme recipes (sidebarItem, sidebarIcon).
// - It auto-closes after clicking a link.
//
// COMMENTING STANDARD:
// - Every variable, function, JSX block is documented technically.
// - Includes debugging notes and error-handling safeguards.
//
// ============================================================================

import {
  Accordion,
  Box,
  Drawer,
  IconButton,
  Portal,
  Text,
  useBreakpointValue,
  useSlotRecipe
} from "@chakra-ui/react";
import { useCallback } from "react";


import { useLocation, useNavigate } from "react-router-dom";

import { FiChevronDown, FiX } from "react-icons/fi";
import * as LucideIcons from "react-icons/lu";

import sidebarIconRecipe from "../../../theme/recipes/sidebarIcon.recipe";
import sidebarItemRecipe from "../../../theme/recipes/sidebarItem.recipe";
import menuData from "../../../utils/data.json";

// ============================================================================
// ICON RESOLVER — converts string names to Lucide icon components
// ============================================================================
function getIconByName(iconName) {
  // PURPOSE:
  //   Safely resolve a string to a Lucide icon component.
  //
  // RETURNS:
  //   React component OR null if icon not found (safe fallback).
  //
  return LucideIcons[iconName] || null;
}

// ============================================================================
// MAIN COMPONENT — SidebarMobile
// ============================================================================
export default function SidebarMobile({ open, onOpen, onClose }) {
  // PARAMETERS:
  //   open (boolean): If true, Drawer is visible.
  //   onOpen (function): Handler used by Drawer.Trigger.
  //   onClose (function): Handler used to close Drawer.
  //
  // RETURN:
  //   JSX structure for mobile Drawer sidebar.
  //
  // WORKFLOW:
  //   - Accordion shows parent/child menu.
  //   - Clicking a link closes Drawer.
  //   - Active route highlighted based on current location.

  // React Router hooks for routing and active detection.
  const navigate = useNavigate();
  const location = useLocation();

  // Slot recipes for styling
  const itemSlot = useSlotRecipe({ recipe: sidebarItemRecipe });
  const iconSlot = useSlotRecipe({ recipe: sidebarIconRecipe });

  // Helper determines if menu item path matches current route.
  const isActiveRoute = (to) => {
    if (!to) return false;
    return location.pathname === to || location.pathname.startsWith(to);
  };

  // Safe navigation wrapper with Drawer auto-close.
  const handleNavigate = useCallback(
    (to) => {
      try {
        if (to) {
          navigate(to);
        }
      } catch (err) {
        console.error("SidebarMobile navigation error:", err);
      }

      // Always close Drawer on mobile after navigation.
      try {
        onClose();
      } catch (err) {
        console.error("Drawer close error:", err);
      }
    },
    [navigate, onClose]
  );

  // Determines if sidebar should render based on breakpoint.
  // Mobile = true, Desktop = false (handled by SidebarDesktop)
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  if (!isMobile) return null; // Defensive: Prevent rendering on desktop

  // ========================================================================
  // RENDER CHILD ITEM (inside Accordion.ItemContent)
  // ========================================================================
  const renderChild = (child) => {
    const Active = isActiveRoute(child.to);
    const IconC = getIconByName(child.icon);

    return (
      <Box
        key={child.id}
        as="button"
        onClick={() => handleNavigate(child.to)}
        className={itemSlot({
          state: Active ? "active" : "default",
        }).row}
        style={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          paddingLeft: "16px",
          borderRadius: Active ? "md" : "0",
          background: Active
            ? "rgba(52,125,230,0.5)"
            : "transparent",
        }}
      >
        {/* icon */}
        <Box className={itemSlot().iconWrap}>
          {IconC ? (
            <IconC
              className={iconSlot({
                variant: Active ? "active" : "default",
              }).svg}
            />
          ) : (
            // fallback icon representation
            <Box width="20px" height="20px" bg="gray.400" borderRadius="md" />
          )}
        </Box>

        {/* label */}
        <Text className={itemSlot().label}>{child.label}</Text>
      </Box>
    );
  };

  // ========================================================================
  // RENDER PARENT ITEM
  // Strict Chakra UI v3 syntax:
  //   <Accordion.Item>
  //     <Accordion.ItemTrigger>...</Accordion.ItemTrigger>
  //     <Accordion.ItemIndicator/>
  //     <Accordion.ItemContent>...</Accordion.ItemContent>
  //   </Accordion.Item>
  // ========================================================================
  const renderParent = (parent) => {
    const parentActive = parent.children.some((c) =>
      isActiveRoute(c.to)
    );
    const IconC = getIconByName(parent.icon);

    return (
      <Accordion.Item key={parent.id} value={parent.value}>
        <Accordion.ItemTrigger
          className={itemSlot({
            state: parentActive ? "active" : "default",
          }).row}
          style={{
            height: "48px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            paddingLeft: "12px",
          }}
        >
          {/* icon */}
          <Box className={itemSlot().iconWrap}>
            {IconC ? (
              <IconC
                className={iconSlot({
                  variant: parentActive ? "active" : "default",
                }).svg}
              />
            ) : (
              <Box width="20px" height="20px" bg="gray.400" borderRadius="md" />
            )}
          </Box>

          {/* label */}
          <Text className={itemSlot().label}>{parent.label}</Text>

          <Accordion.ItemIndicator>
            <FiChevronDown />
          </Accordion.ItemIndicator>
        </Accordion.ItemTrigger>

        {/* Child menu items */}
        <Accordion.ItemContent
          style={{
            paddingLeft: "12px",
            marginTop: "4px",
          }}
        >
           <Accordion.ItemBody>
              {parent.children.map((c) => renderChild(c))}
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    );
  };

  // ========================================================================
  // MAIN DRAWER STRUCTURE — STRICT CHAKRA UI V3 HIERARCHY
  // ========================================================================
  return (
    <Drawer.Root open={open} onOpen={onOpen} onClose={onClose} placement="left">
      {/* Trigger is typically placed in NavBar or header */}
      <Drawer.Trigger asChild>
        {/* empty, because parent provides actual trigger button */}
        <Box />
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop />

        <Drawer.Positioner>
          <Drawer.Content
            style={{
              width: "var(--drawer-size-sm)", // matching your selected size: "sm"
              background: "var(--chakra-colors-gray-50)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
            }}
          >
            {/* HEADER */}
            <Drawer.Header>
              <Drawer.Title>TFMS Menu</Drawer.Title>
            </Drawer.Header>

            {/* BODY with Accordion */}
            <Drawer.Body>
              <Accordion.Root
                defaultValue={[]}
                multiple
              >
                {menuData.menuItems.map((parent) =>
                  renderParent(parent)
                )}
              </Accordion.Root>
            </Drawer.Body>

            {/* FOOTER */}
            <Drawer.Footer>
              {/* Drawer close control using v3 CloseTrigger */}
              <Drawer.CloseTrigger asChild>
                <IconButton
                  aria-label="Close menu"
                  
                  size="lg"
                >
                  <FiX />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
