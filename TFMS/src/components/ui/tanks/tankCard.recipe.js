// theme/recipes/tankCard.recipe.js
import { defineSlotRecipe } from "@chakra-ui/react";

const tankCardRecipe = defineSlotRecipe({
  className: "tankCard",

  slots: [
    "root",
    "header",
    "title",
    "subTitle",
    "body",
    "footer",
    "iconWrap",
    "metricRow",
    "metricLabel",
    "metricValue",
    "sideBar",
  ],

  base: {
    root: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      borderRadius: "lg",
      background: "bg",
      border: "1px solid",
      borderColor: "border",
      overflow: "hidden",
      transition: "all 0.25s ease",
      boxShadow: "subtle",

      // responsive environment
      _dark: {
        background: "gray.800",
      },
    },

    // Left colored indicator strip (alarm status applied inline)
    sideBar: {
      width: "6px",
      flexShrink: 0,
      borderTopLeftRadius: "lg",
      borderBottomLeftRadius: "lg",
      background: "transparent", // Alarm color inline
    },

    header: {
      display: "flex",
      alignItems: "center",
      padding: "4",
      gap: "3",
      borderBottom: "1px solid",
      borderColor: "border",
    },

    iconWrap: {
      width: "38px",
      height: "38px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },

    title: {
      fontWeight: "bold",
      fontSize: "lg",
      color: "text",
      lineHeight: "1.2",
    },

    subTitle: {
      fontSize: "sm",
      color: "textSubtle",
    },

    body: {
      display: "flex",
      flexDirection: "column",
      padding: "4",
      gap: "3",
      flexGrow: 1,
    },

    metricRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingY: "1",
    },

    metricLabel: {
      fontSize: "sm",
      color: "textSubtle",
    },

    metricValue: {
      fontSize: "md",
      fontWeight: "medium",
      color: "text",
    },

    footer: {
      marginTop: "auto",
      padding: "3",
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
        root: { padding: "2" },
        title: { fontSize: "md" },
        iconWrap: { width: "30px", height: "30px" },
      },
      md: {
        root: { padding: "3" },
      },
      lg: {
        root: { padding: "4" },
        title: { fontSize: "xl" },
        iconWrap: { width: "44px", height: "44px" },
      },
      xl: {
        root: { padding: "5" },
        title: { fontSize: "2xl" },
        iconWrap: { width: "52px", height: "52px" },
      },
    },

    // Layout patterns: desktop vs mobile card
    shape: {
      classic: {
        root: {
          flexDirection: "column",
        },
      },
      leftStrip: {
        root: {
          flexDirection: "row",
        },
        body: {
          paddingLeft: "4",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    shape: "classic",
  },
});

export default tankCardRecipe;
