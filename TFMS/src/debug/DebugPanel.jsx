// src/debug/DebugPanel.jsx
// ============================================================================
// PURPOSE
// ----------------------------------------------------------------------------
// A non-intrusive developer diagnostic tool to help debug the sidebar system,
// including hover-expand behavior, pinned state, localStorage syncing,
// breakpoint mode, Drawer state, and active route resolution.
//
// The panel appears ONLY when:
//   - localStorage.DEBUG_PANEL === "true"
//   - OR user presses Ctrl+Shift+D (toggle)
//
// This file is optional and safe in production builds.
// The component is rendered at the root layout if enabled.
//
// ============================================================================

import {
  Box,
  Button,
  Flex,
  Kbd,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

// ============================================================================
// MAIN COMPONENT — DebugPanel
// ----------------------------------------------------------------------------
// Parameters: none
// Returns: A floating diagnostic panel for internal debugging.
//
// WORKFLOW:
//   - Watches browser events for Ctrl+Shift+D to toggle visibility
//   - Reads sidebar debug states from localStorage
//   - Shows breakpoint mode and draw states
//
// EXCEPTION HANDLING:
//   Wrapped localStorage calls in try/catch to prevent UI crashes.
// ============================================================================
export default function DebugPanel() {
  // Track if panel is visible
  const [visible, setVisible] = useState(false);

  // Track sidebar values fetched from localStorage
  const [debugState, setDebugState] = useState({
    collapsed: "unknown",
    pinned: "unknown",
    hoverActive: "unknown",
    activeRoute: "unknown",
  });

  // Detect current breakpoint (mobile/desktop)
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  // ==========================================================================
  // FUNCTION: loadDebugState
  // --------------------------------------------------------------------------
  // Purpose:
  //   Fetch debugging values from localStorage and refresh internal state.
  //
  // Parameters:
  //   None
  //
  // Returns:
  //   Nothing (updates React state)
  //
  // Workflow:
  //   - Query keys used by SidebarDesktop.jsx
  //   - Parse safely
  //
  // ==========================================================================
  const loadDebugState = useCallback(() => {
    try {
      setDebugState({
        collapsed: localStorage.getItem("tfms_sidebar_collapsed") || "null",
        pinned: localStorage.getItem("tfms_sidebar_pinned") || "null",
        hoverActive: localStorage.getItem("tfms_sidebar_hover_active") || "null",
        activeRoute: localStorage.getItem("tfms_active_route") || "null",
      });
    } catch (err) {
      console.error("Debug state load error:", err);
    }
  }, []);

  // ==========================================================================
  // EFFECT: initialize visibility
  // --------------------------------------------------------------------------
  // Purpose:
  //   On mount, check if developer enabled panel via localStorage.
  //
  // Keyboard:
  //   Ctrl+Shift+D toggles debug panel at runtime.
  // ==========================================================================
  useEffect(() => {
    try {
      const saved = localStorage.getItem("DEBUG_PANEL");
      setVisible(saved === "true");
    } catch (err) {
      console.error("Debug panel init error:", err);
    }

    const handleKey = (ev) => {
      if (ev.ctrlKey && ev.shiftKey && ev.key === "D") {
        ev.preventDefault();
        setVisible((prev) => {
          const newState = !prev;
          localStorage.setItem("DEBUG_PANEL", String(newState));
          return newState;
        });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ==========================================================================
  // EFFECT: auto-refresh debug values every time panel becomes visible
  // ==========================================================================
  useEffect(() => {
    if (visible) {
      loadDebugState();
    }
  }, [visible, loadDebugState]);

  // ==========================================================================
  // HIDE WHEN NOT ENABLED
  // ==========================================================================
  if (!visible) return null;

  // ==========================================================================
  // RENDER — Floating Debug Panel
  // ==========================================================================
  return (
    <Box
      position="fixed"
      bottom="16px"
      right="16px"
      bg="bgElevated"
      border="1px solid"
      borderColor="border"
      shadow="elevated"
      p="4"
      width="320px"
      borderRadius="md"
      zIndex="999999"
    >
      <Text textStyle="md" fontWeight="bold" mb="2">
        TFMS Debug Panel
      </Text>

      {/* Breakpoint information */}
      <Flex justify="space-between">
        <Text textStyle="sm">Mode:</Text>
        <Text textStyle="sm" fontWeight="semibold">
          {isMobile ? "MOBILE" : "DESKTOP"}
        </Text>
      </Flex>

      {/* Divider */}
      <Box
        mt="2"
        mb="2"
        height="1px"
        bg="border"
        width="100%"
      />

      {/* Sidebar technical values */}
      <Text textStyle="sm" mb="1">Sidebar States:</Text>
      <Flex justify="space-between">
        <Text textStyle="xs">Collapsed</Text>
        <Text textStyle="xs">{debugState.collapsed}</Text>
      </Flex>
      <Flex justify="space-between">
        <Text textStyle="xs">Pinned</Text>
        <Text textStyle="xs">{debugState.pinned}</Text>
      </Flex>
      <Flex justify="space-between">
        <Text textStyle="xs">Hover Active</Text>
        <Text textStyle="xs">{debugState.hoverActive}</Text>
      </Flex>
      <Flex justify="space-between">
        <Text textStyle="xs">Active Route</Text>
        <Text textStyle="xs">{debugState.activeRoute}</Text>
      </Flex>

      {/* Divider */}
      <Box
        mt="2"
        mb="2"
        height="1px"
        bg="border"
        width="100%"
      />

      {/* Reload debug values */}
      <Button
        variant="outline"
        size="sm"
        width="100%"
        onClick={loadDebugState}
      >
        Refresh Values
      </Button>

      {/* Note about keyboard toggle */}
      <Text textStyle="xs" mt="2" opacity="0.7">
        Toggle this panel with <Kbd>Ctrl</Kbd>+<Kbd>Shift</Kbd>+<Kbd>D</Kbd>
      </Text>
    </Box>
  );
}
