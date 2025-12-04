// src/theme/recipes/sidebarItem.recipe.js
import { defineRecipe } from "@chakra-ui/react";

// src/theme/recipes/sidebarItem.recipe.js

const sidebarItemRecipe = defineRecipe({
  className: "tfms-sidebar-item",

  base: {
    row: { // styling for children
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      px: 2,
      py: 2,
      mt:1,
      color: "gray.800",
      fontSize: "md",
      fontWeight: "semibold",
      borderRadius: "full",
      transition:  "background 0.2s ease, color 0.2s ease",
      cursor: "pointer",
      // mark as group
      '&[data-group="row"]': {},
      _hover: {
        bg: "brand.500",  //hover background color to children
        color: "white",   //hover text color to children
      },
    },

    iconWrap: {
      width: "1.5rem",
      height: "1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "inherit", // ✅ let SVG use currentColor
      transition: "transform 0.2s ease",
      '[data-group="row"]:hover &': { transform: "scale(1.1)" },
    },
    label: {
      flex: 1,          // ✅ allow label to take remaining space
      minWidth: 0,      // ✅ critical for ellipsis/wrapping inside flex
      fontSize: "md",
      color: "gray.800",
      px: 1,
      py: 1,
      borderRadius: "full",
      transition: "background 0.2s ease, color 0.2s ease",
      '[data-group="row"]:hover &': { color: "white" },
    },

    indicator: {
      width: "1.5rem",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity 0.2s ease",
      opacity: 0.6,
      color: "inherit", // ✅ let SVG use currentColor
      // Push indicator to far right and keep uniform gap from the right edge
      ml: "auto",
      mr: 0,
      _groupHover: { opacity: 1 }, // ✅ works collapsed or expanded
    },
  },

  variants: {
    state: {
      default: {
        row: { bg: "transparent" },
      },

     activeChild: {
      row: {
        bg: "blue.600",     // 🔥 strong highlight for active child
        color: "white",
      },
      label: { color: "white" },
      iconWrap: { color: "blue.600" },
    },

    activeParent: {
      row: {
        bg: "blue.300",     // 🔥 softer highlight for parent
        color: "blue.800",
      },
      label: { color: "blue.700" },
      iconWrap: { color: "blue.500" },
    },
    },

    // `expanded` is a separate variant so it can be toggled independently
    expanded: {
      true: {
        label: {
          flex: "unset",
          minWidth: "auto",
          display: "inline-block",
          whiteSpace: "nowrap",
          overflow: "visible",
          textOverflow: "unset",
          width: "auto",
        },
      },

      false: {
        label: {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        },
      },
    },
  },

  defaultVariants: {
    state: "default",
    expanded: "false",
  },
});

export default sidebarItemRecipe;

