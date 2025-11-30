// src/theme/recipes/sidebar.recipe.js
import { defineRecipe } from "@chakra-ui/react";

// const sidebarRecipe = defineRecipe({
//   className: "tfms-sidebar",
//   base: {
//     container: {
//       position: "relative", 
//       bg: "gray.50",
//       borderRight: "2px solid",
//       borderColor: "brand.500",
//       display: "flex",
//       flexDirection: "column",
//       height: "100vh", 
//       overflow: "hidden",
//       transition: "width 0.5s ease-in-out",   // ✅ smooth width change
//     },

//     scroll: {
//       flex: 1,                   // ✅ take available vertical space
//       minHeight: 0,   // ✅ allows shrinking → enables scroll
//       display: "flex",       // ✅ make it a flex column
//       flexDirection: "column",
//       overflowY: "auto",
//       px: 1,
//       py: 1,
//       overscrollBehavior: "contain",   // optional: prevents parent bounce
//       paddingBottom: "48px",  // space for toggle button
//     },

//     brand: {
//       py: 3,
//       px: 3,
//       alignItems: "center",
//       minHeight: "56px",
//       borderBottom: "1px solid",
//       borderColor: "gray.200",
//       flexShrink: 0,     // ✅ prevent shrinking 
//                         // ✅ brand remains fixed height
//     },
//   },

//   variants: {
//     size: {
//       collapsed: {
//         container: {
//           width: "64px",
//         },
//         brand: {
//           justifyContent: "center",
//         },
//         scroll: {
//           px: 1,
//         },
//       },

//       expanded: {
//         container: {
//           width: "280px",
//         },
//         brand: {
//           justifyContent: "flex-start",
//         },
//         scroll: {
//           px: 2,
//         },
//       },
//     },
//   },

//   defaultVariants: {
//     size: "expanded",
//   },
// });

const sidebarRecipe = defineRecipe({
  className: "tfms-sidebar",

  base: {
    container: {
      bg: "gray.50",
      borderRight: "2px solid",
      borderColor: "brand.500",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "visible",
      transition: "width 0.5s ease-in-out",
    },

    brand: {
      py: 3,
      px: 3,
      alignItems: "center",
      minHeight: "56px",
      borderBottom: "1px solid",
      borderColor: "gray.200",
      flexShrink: 0,
    },

    // 🔥 Scroll area ABOVE toggle
    scroll: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarGutter: "stable",
    px: 2,
    py: 2,
    paddingBottom: "80px",  // ⭐ KEEP SCROLL FULL + KEEP TOGGLE VISIBLE
    overscrollBehavior: "contain",
    

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
      fontSize: "24px",
      zIndex: 10,
      alignSelf: "center",
    },
  },

  variants: {
    size: {
      collapsed: {
        container: {
          width: "64px",
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

