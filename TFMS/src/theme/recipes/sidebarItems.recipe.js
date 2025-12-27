import { defineRecipe } from "@chakra-ui/react";

//Row recipe for Sidebar Item

export const sidebarRowRecipe = defineRecipe({
  className: "tfms-sidebar-row",
  base: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "8px",
    padding: "4px 10px",
    mt: 2,

    borderRadius: "full",
    cursor: "pointer",
    transition: "background 0.2s ease, color 0.2s ease",

    "&:hover": { bg: "brand.500", color: "white" },

    '&[data-state="open"]': { bg: "pink.400", color: "white" },

    '&[data-state="open"] > *': { color: "white" },
  },
  variants: {
    state: {
      default: { bg: "transparent", color: "gray.800" },
      activeChild: { bg: "brand.600", color: "white" },
      activeParent: { bg: "brand.400", color: "brand.900" },
    },
  },
  defaultVariants: { state: "default" },
});


// Icon recipe
export const sidebarIconRecipe = defineRecipe({
  className: "tfms-sidebar-icon",
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
    transition: "transform 0.2s ease",
    '[data-group="row"]:hover &': { transform: "scale(1.1)" },
    "& > *": { width: "100%", height: "100%" },
  },
  variants: {
    size: {
      sm: { width: "1rem", height: "1rem" },
      md: { width: "1.25rem", height: "1.25rem" },
      lg: { width: "1.75rem", height: "1.75rem" },
    },
  },
  defaultVariants: { size: "md" },
});

//Label recipe

export const sidebarLabelRecipe = defineRecipe({
  className: "tfms-sidebar-label",
  base: {
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
  variants: {
    size: {
      sm: { fontSize: "0.95rem" },
      md: { fontSize: "1.15rem" },
    },
    expanded: {
      true: {
        flex: "unset",
        minWidth: "auto",
        display: "inline-block",
        overflow: "visible",
        textOverflow: "unset",
        width: "auto",
        transform: "translateX(0)",
      },
      false: { transform: "translateX(-4px)" },
    },
    mode: {
      accordion: {
        '[data-expanded="true"] &': { opacity: 1 },
        '[data-expanded="false"] &': { opacity: 0 },
      },
      menu: {
        '[data-expanded="true"] &': { opacity: 0 },
        '[data-expanded="false"] &': { opacity: 1 },
      },
    },
  },
  defaultVariants: { size: "md", expanded: "false", mode: "menu" },
});

//Indicator recipe
export const sidebarIndicatorRecipe = defineRecipe({
  className: "tfms-sidebar-indicator",
  base: {
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
    "& > *": { width: "1.25rem", height: "1.25rem" },
  },
});

const sidebarsItemRecipes = defineRecipe({
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
    // 🔥 per-item state, no attributes, no data-slot
    state: {
      default: {
        row: {
          bg: "transparent",
        },
        label: {
          color: "gray.800",
        },
        iconWrap: {
          color: "inherit",
        },
      },

      active: {
      true: {},   // generic active flag
      false: {},  // default
    },

  },

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
  
   compoundVariants: [
    {
      active: true,
      level: "child",
      css: {
        row: { bg: "brand.600", color: "white" },
        label: { color: "white" },
        iconWrap: { color: "brand.200" },
      },
    },
    {
      active: true,
      level: "parent",
      css: {
        row: { bg: "brand.400", color: "brand.900" },
        label: { color: "brand.50" },
        iconWrap: { color: "brand.900" },
      },
    },
  ],

  defaultVariants: {
    state: "default",
    expanded: "false",
    mode: "menu",
    level: "parent",
  },
});


// copied one
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
    // 🔥 per-item state, no attributes, no data-slot
    state: {
      default: {
        row: {
          bg: "transparent",
        },
        label: {
          color: "gray.800",
        },
        iconWrap: {
          color: "inherit",
        },
      },

      activeChild: {
        row: {
          bg: "brand.600",
          color: "white",
        },
        label: {
          color: "white",
        },
        iconWrap: {
          color: "brand.200",
        },
      },

      activeParent: {
        row: {
          bg: "brand.400",
          color: "brand.900",
        },
        label: {
          color: "brand.50",
        },
        iconWrap: {
          color: "brand.900",
        },
      },
    },

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
    state: "default",
    expanded: "false",
    mode: "menu",
    level: "parent",
  },
});