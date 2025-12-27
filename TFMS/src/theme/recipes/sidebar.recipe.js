// src/theme/recipes/sidebar.recipe.js
import { defineRecipe } from "@chakra-ui/react";

const sidebarRecipe = defineRecipe({
  className: "tfms-sidebar",

  base: {
    container: {
      bg: "gray.50",
      borderRight: "2px solid",
      borderColor: "brand.760",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "visible",
      mt:2,
      transition: "width 0.5s ease-in-out",
    },

    // 🔥 Scroll area ABOVE toggle
    scroll: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden",
    // scrollbarGutter: "stable",
    // px: 2,
    // py: 2,
    paddingBottom: "80px",  // ⭐ KEEP SCROLL FULL + KEEP TOGGLE VISIBLE
    overscrollBehavior: "contain",

      // ⭐ Scrollbar styling
  "&::-webkit-scrollbar": {
    width: "0.3rem",   // scrollbar track width
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent", // optional track background
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "brand.850", // your theme token
    borderRadius: "full",         // rounded thumb
  },
   

  // ⭐ FIX RADIX ACCORDION LIMITATION
  "& [data-radix-accordion-content]": {
    display: "block",
    height: "auto !important",
    overflow: "visible !important",
  },

  "& [data-radix-accordion-content] > div": {
    display: "block !important",
    height: "auto !important",
  }
},

    // 🔥 NEW: Toggle button at bottom
    toggle: {
      flexShrink: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "48px",
      width: "100%",
      cursor: "pointer",
      bg: "gray.50",
      zIndex: 10,
      alignSelf: "center",
    },
  },

  variants: {
    size: {
      collapsed: {
        container: {
          width: "80px",
        },
        brand: {
          justifyContent: "center",
        },
        scroll: {
          px: 1,
        },
      },

      expanded: {
        container: {
          width: "280px",
        },
        brand: {
          justifyContent: "flex-start",
        },
        scroll: {
          px: 2,
        },
      },
    },
  },

  defaultVariants: {
    size: "expanded",
  },
});


export default sidebarRecipe;