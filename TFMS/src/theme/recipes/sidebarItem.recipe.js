// src/theme/recipes/sidebarItem.recipe.js

import { defineRecipe } from "@chakra-ui/react";

const sidebarItemRecipe = defineRecipe({
  className: "tfms-sidebar-item",

  base: {
    row: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "8px",
      padding: "4px 10px",
      mt: 2,

      color: "gray.800",
      fontSize: "md",
      fontWeight: "semibold",

      borderRadius: "full",
      cursor: "pointer",
      transition: "background 0.2s ease, color 0.2s ease",

      "&:focus": { outline: "none" },
      "&:focus-visible": { outline: "none" },

      "&:hover": {
        background: "brand.500",
        color: "white",
      },

      '&[data-state="open"]': {
        bg: "pink.400",
        color: "white !important",
      },

      '&[data-state="open"] > *': {
        color: "white",

},

    },

    iconWrap: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "inherit",
      transition: "transform 0.2s ease",
      '[data-group="row"]:hover &': { transform: "scale(1.1)" },
      "& > *": {
      width: "100%",
      height: "100%",   
      },
      
    },

    label: {
      flex: 1,
      minWidth: 0,
      px: 1,
      py: 1,
      borderRadius: "full",
      transition: "opacity 0.15s ease, transform 0.15s ease, color 0.2s ease",
      '[data-group="row"]:hover &': { color: "white" },
      
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      transform: "translateX(-4px)",
    },

    indicator: {
      width: "1.25rem",
      height: "1.25rem",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity 0.2s ease",
      opacity: 0.6,
      color: "inherit",
      ml: "auto",
      mr: 0,
     "& > *": {
      width: "1.25rem",
      height: "1.25rem",
      },
    },
  },

  variants: {    

    // expanded behaviour
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
          transform: "translateX(0)",
        },
      },
      false: {
        label: {
          transform: "translateX(-4px)",
        },
        iconWrap: {
          width: "1.75rem",
          height: "1.75rem",
        },
      },
    },

    mode: {
      accordion: {
        label: {
          '[data-expanded="true"] &': { opacity: 1 },
          '[data-expanded="false"] &': { opacity: 0 },
        },
      },
      menu: {
        label: {
          '[data-expanded="true"] &': { opacity: 0 },
          '[data-expanded="false"] &': { opacity: 1 },
        },
      },
    },

    level: {
      parent: {
        iconWrap: { width: "1.25rem", height: "1.25rem" },
        label: { fontSize: "1.15rem" },
      },
      child: {
        iconWrap: { width: "1rem", height: "1rem" }, // smaller icon
        label: { fontSize: "0.95rem" }, // smaller text
      },
    },

  },

  defaultVariants: {
    // state: "default",
    expanded: "false",
    mode: "menu",
    level: "parent",
  },
});

export default sidebarItemRecipe;


