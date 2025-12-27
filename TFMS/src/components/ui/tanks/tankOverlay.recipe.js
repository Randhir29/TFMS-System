// theme/recipes/tankOverlay.recipe.js
import { defineSlotRecipe } from "@chakra-ui/react";

const tankOverlayRecipe = defineSlotRecipe({
  className: "tankOverlay",

  slots: [
    "backdrop",
    "container",
    "panel",
    "header",
    "title",
    "close",
    "tabBar",
    "tab",
    "content",
    "section",
    "sectionTitle",
    "sectionBody",
    "footer",
  ],

  base: {
    // Floating UI backdrop
    backdrop: {
      position: "fixed",
      inset: "0",
      bg: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(3px)",
      zIndex: "modal",
    },

    // Main viewport container
    container: {
      position: "fixed",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "6",
      zIndex: "modal",
    },

    // The dialog panel
    panel: {
      width: "100%",
      maxWidth: "900px",
      maxHeight: "90vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      borderRadius: "xl",
      background: "bg",
      boxShadow: "elevated",
      border: "1px solid",
      borderColor: "border",

      _dark: {
        background: "gray.800",
      },
    },

    // Header with title + close button
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "4",
      borderBottom: "1px solid",
      borderColor: "border",
    },

    title: {
      fontSize: "xl",
      fontWeight: "bold",
      color: "text",
    },

    close: {
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "md",
      cursor: "pointer",
      transition: "all 0.2s ease",

      _hover: {
        bg: "bgSubtle",
      },
    },

    // Top tab bar (Overview | Parameters | Trends | Alarms)
    tabBar: {
      display: "flex",
      gap: "2",
      paddingX: "4",
      paddingY: "3",
      borderBottom: "1px solid",
      borderColor: "border",
    },

    tab: {
      paddingX: "4",
      paddingY: "2",
      borderRadius: "md",
      fontSize: "sm",
      cursor: "pointer",
      transition: "all 0.2s ease",
      userSelect: "none",
      color: "textSubtle",
    },

    // Scrollable area of the modal
    content: {
      overflowY: "auto",
      padding: "4",
      display: "flex",
      flexDirection: "column",
      gap: "6",
    },

    section: {
      display: "flex",
      flexDirection: "column",
      gap: "3",
      paddingBottom: "4",
      borderBottom: "1px solid",
      borderColor: "border",
    },

    sectionTitle: {
      fontSize: "lg",
      fontWeight: "semibold",
      color: "text",
    },

    sectionBody: {
      fontSize: "sm",
      color: "textSubtle",
      lineHeight: "1.6",
    },

    footer: {
      padding: "4",
      borderTop: "1px solid",
      borderColor: "border",
      display: "flex",
      justifyContent: "flex-end",
      gap: "3",
    },
  },

  variants: {
    size: {
      sm: {
        panel: { maxWidth: "600px" },
      },
      md: {
        panel: { maxWidth: "900px" },
      },
      lg: {
        panel: { maxWidth: "1200px" },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

export default tankOverlayRecipe;
