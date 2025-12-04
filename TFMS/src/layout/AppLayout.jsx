// src/layout/AppLayout.jsx
// ============================================================================
// PURPOSE
// ----------------------------------------------------------------------------
// AppLayout is the root-level UI layout for TFMS. It arranges:
//
//   - <NavBar>          (sticky top brand header)
//   - <Sidebar>         (Desktop persistent OR Mobile Drawer)
//   - <MainContent>     (<Outlet /> from react-router)
//   - <DebugPanel>      (developer diagnostics overlay)
//
// STRUCTURE:
//   <div id="root">
//       <NavBar />
//       <Flex>
//           <Sidebar />     // desktop OR drawer-trigger mobile
//           <Box>Outlet</Box>
//       </Flex>
//   </div>
//
// WORKFLOW CONTEXT:
//   - Mobile: NavBar passes onMobileMenuOpen → SidebarMobile
//   - Desktop: SidebarDesktop always visible
//   - Main content scrolls independently (overflow auto)
//   - No Chakra UI v2 syntax used
//   - Strict usage of semantic tokens + system API
//
// ============================================================================

import { useCallback, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Header from "../components/ui/Header";
import Sidebar from "../components/ui/sidebar/Sidebar";
import DebugPanel from "../debug/DebugPanel";

// ============================================================================
// COMPONENT — AppLayout
// ----------------------------------------------------------------------------
// Parameters: none
//
// Returns:
//   Full-page rendering environment with header + sidebar + outlet.
//
// EXCEPTIONS HANDLED:
//   - Errors in opening/closing mobile sidebar are captured in NavBar/Sidebar.
//   - Layout itself is extremely stable and side-effect free.
//
// ============================================================================
export default function AppLayout() {
  // -------------------------------------------------------------------------
  // STATE: mobile drawer open flag
  // -------------------------------------------------------------------------
  // This state is used ONLY for mobile SidebarMobile
  // It is passed into Sidebar via NavBar → onMobileMenuOpen callback.
  //
  // DESIGN:
  //   The state remains in AppLayout so both NavBar & Sidebar can orchestrate
  //   mobile drawer actions cleanly.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // -------------------------------------------------------------------------
  // HANDLER — open mobile sidebar drawer
  // -------------------------------------------------------------------------
  const handleMobileMenuOpen = useCallback(() => {
    try {
      setMobileMenuOpen(true);
    } catch (err) {
      console.error("Error opening mobile sidebar:", err);
    }
  }, []);

  // -------------------------------------------------------------------------
  // HANDLER — close mobile sidebar drawer
  // -------------------------------------------------------------------------
  const handleMobileMenuClose = useCallback(() => {
    try {
      setMobileMenuOpen(false);
    } catch (err) {
      console.error("Error closing mobile sidebar:", err);
    }
  }, []);

  // ========================================================================
  // RENDER — Header, Sidebar, and Main Content Area
  // ========================================================================
  return (
    <Box
      width="100%"
      height="100vh"
      overflow="hidden" // Prevents browser double-scrollbars
      bg="gray.50"
    >
      {/* --------------------------------------------------------------------
         BRAND HEADER — always sticky at the top
         -------------------------------------------------------------------- */}
      <Header onMobileMenuOpen={handleMobileMenuOpen} />

      {/* --------------------------------------------------------------------
         SIDEBAR + MAIN CONTENT AREA
         --------------------------------------------------------------------
         - Desktop sidebar is always visible & takes vertical space beside main
         - Mobile sidebar Drawer opens *over* the content, not beside it
         - Main content scrolls, sidebar does not
         -------------------------------------------------------------------- */}
      <Flex height="calc(100vh - 64px)" overflow="hidden">
        {/* Sidebar (nav) orchestrates mobile/desktop internally */}
        <Sidebar
          openMobile={mobileMenuOpen}
          onOpen={handleMobileMenuOpen}
          onClose={handleMobileMenuClose}
        />

        {/* ---------------------------------------------------------------
           MAIN CONTENT SCROLLING AREA
           --------------------------------------------------------------- */}
        <Box
          as="main"
          flex="1"
          overflowY="auto"
          overflowX="hidden"
          bg="bgSubtle"      // subtle background for content area
          p="4"              // safe content padding
        >
          {/* React Router outlet for page rendering */}
          <Outlet />
        </Box>
      </Flex>

      {/* --------------------------------------------------------------------
         DEBUG PANEL — appears only when enabled via localStorage
         -------------------------------------------------------------------- */}
      <DebugPanel />
    </Box>
  );
}
