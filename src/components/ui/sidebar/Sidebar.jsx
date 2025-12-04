// src/ui/sidebar/Sidebar.jsx
// ============================================================================
// PURPOSE OF THIS FILE
// ----------------------------------------------------------------------------
// This component acts as a **device-aware sidebar orchestrator**. Its job is:
//
//   1. Detect viewport breakpoint (base→mobile, md→desktop).
//   2. Render the correct sidebar variant:
//        - SidebarDesktop.jsx for desktop/laptop screens.
//        - SidebarMobile.jsx for mobile and tablet screens.
//   3. Provide open/close state ONLY for the mobile Drawer.
//   4. Keep the desktop sidebar mounted persistently.
//   5. Maintain clean separation of concerns:
//        - Desktop sidebar handles hover/pin logic internally.
//        - Mobile sidebar handles Drawer state internally.
//   6. Provide technical auditability and robust debugging.
//
// WORKFLOW CONTEXT:
//   - This file is included in AppLayout:
//        <BrandBar />
//        <Sidebar />
//        <MainContent />
//
//   - ALL business logic related to navigation UI is delegated to either
//     SidebarDesktop.jsx or SidebarMobile.jsx.
//   - This wrapper contains *no styling logic*, only orchestration.
//
// COMMENTING STANDARD:
//   - Every variable, state, function has technical annotations.
//   - Includes workflow, intent, error handling context.
//
// ============================================================================

import { useCallback, useState } from "react";

import { Box, useBreakpointValue } from "@chakra-ui/react";

import SidebarDesktop from "./SideBarDesktop";
import SidebarMobile from "./SidebarMobile";

// ============================================================================
// MAIN COMPONENT — Sidebar
// ----------------------------------------------------------------------------
// This component decides which sidebar to render based on the active breakpoint.
//
// PARAMETERS: none
// RETURN VALUE: A rendered sidebar component appropriate for the screen size.
//
// ERROR HANDLING:
//   - All navigation logic & localStorage logic is inside respective sub-components.
//   - This wrapper is stable and side-effect free.
// ============================================================================

export default function Sidebar() {
  // ------------------------------------------------------------------------
  // BREAKPOINT DETECTION
  // ------------------------------------------------------------------------
  // `useBreakpointValue` returns a value depending on screen size.
  //
  // CONFIG:
  //   base → true  = mobile mode active
  //   md   → false = desktop mode active
  //
  // If screen is < md → isMobile = true
  // If screen is ≥ md → isMobile = false
  //
  // This ensures the Drawer-based sidebar is ONLY mounted on mobile.
  // On desktop, SidebarDesktop is always visible.
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  console.log(isMobile);

  // ------------------------------------------------------------------------
  // DRAWER OPEN STATE (MOBILE ONLY)
  // ------------------------------------------------------------------------
  // `openMobile` tracks whether the mobile Drawer sidebar is visible.
  // This state is NOT used by desktop variant.
  //
  // It is intentionally kept here so SidebarMobile remains a pure UI component.
  const [openMobile, setOpenMobile] = useState(false);

  // ------------------------------------------------------------------------
  // OPEN HANDLER — abstraction for DrawerRoot.onOpen
  // ------------------------------------------------------------------------
  // PURPOSE:
  //   Called when hamburger button (NavBar or elsewhere) triggers opening.
  //
  // WORKFLOW:
  //   - This will be passed down to SidebarMobile.
  const handleOpen = useCallback(() => {
    try {
      setOpenMobile(true);
    } catch (err) {
      console.error("Sidebar mobile open error:", err);
    }
  }, []);

  // ------------------------------------------------------------------------
  // CLOSE HANDLER — abstraction for DrawerRoot.onClose
  // ------------------------------------------------------------------------
  // PURPOSE:
  //   Close the mobile Drawer (called on link click or close button).
  //
  // WORKFLOW:
  //   - Passed down to SidebarMobile to unify closing logic.
  const handleClose = useCallback(() => {
    try {
      setOpenMobile(false);
    } catch (err) {
      console.error("Sidebar mobile close error:", err);
    }
  }, []);

  // ========================================================================
  // CONDITIONAL RENDERING BASED ON DEVICE TYPE
  // ========================================================================
  //
  // - Desktop mode: return SidebarDesktop (persistent left bar)
  // - Mobile mode:  return SidebarMobile (Drawer)
  //
  // The wrappers of AppLayout handle layout spacing / positioning.
  //
  // Defensive: Always ensure desktop/mobile are mutually exclusive.
  // ========================================================================

  if (isMobile) {
    // ----------------------------------------------------------------------
    // MOBILE VARIANT: Drawer Sidebar
    // ----------------------------------------------------------------------
    // Exposing:
    //   open  → whether Drawer is open
    //   onOpen / onClose → control handlers
    //
    // Drawer.Trigger is placed INSIDE Navbar usually.
    // ----------------------------------------------------------------------
    return (
      <Box as="nav" width="100%" height="100%">
        <SidebarMobile
          open={openMobile}
          onOpen={handleOpen}
          onClose={handleClose}
        />
      </Box>
    );
  }

  // ------------------------------------------------------------------------
  // DESKTOP VARIANT: Persistent Sidebar
  // ------------------------------------------------------------------------
   return (
    <Box as="nav" height="100%">
      <SidebarDesktop />
    </Box>
  );
}
