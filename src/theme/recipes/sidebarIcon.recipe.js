// src/theme/recipes/sidebarIcon.recipe.js

import { defineRecipe } from "@chakra-ui/react";
// src/theme/recipes/sidebarIcon.recipe.js

const sidebarIconRecipe = defineRecipe({
  className: "tfms-sidebar-icon",
  base: {
    wrap: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "32px",
      height: "32px",
      color: "inherit",
       transition: "color 0.2s ease, transform 0.2s ease",
      cursor: "pointer",

      // wrapper hover effect
      _hover: {
        transform: "scale(1.1)",   // subtle zoom
      },
    },

    svg: {
      width: "1.5rem",
      height: "1.5rem",
      transition: "color 0.2s ease, transform 0.2s ease",
      color: "inherit",

      // svg hover effect
      _hover: {
        color: "brand.50",        // darker brand color on hover
        transform: "scale(1.05)",  // slight zoom on the icon itself
      },
    },
  },

  variants: {
    variant: {
      default: {
        svg: { color: "inherit" },
      },
      active: {
        svg: { color: "brand.400" },
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export default sidebarIconRecipe;

