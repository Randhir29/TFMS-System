// theme/recipes/tankIcon.recipe.js
import { defineRecipe } from "@chakra-ui/react";

const tankIconRecipe = defineRecipe({
  className: "tankIcon",

  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,

    // Smooth visuals
    transition: "all 0.25s ease",

    // BODY CYLINDER
    "&[data-part=body]": {
      position: "absolute",
      inset: "0",
      borderRadius: "full",
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.35) 0%, rgba(0,0,0,0.10) 100%), #d1d5db",
    },

    // LEFT CAP
    "&[data-part=cap-left]": {
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      width: "20%",
      borderTopLeftRadius: "full",
      borderBottomLeftRadius: "full",
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.45) 0%, rgba(0,0,0,0.05) 100%), #d1d5db",
    },

    // RIGHT CAP
    "&[data-part=cap-right]": {
      position: "absolute",
      right: "0",
      top: "0",
      bottom: "0",
      width: "20%",
      borderTopRightRadius: "full",
      borderBottomRightRadius: "full",
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.20) 100%), #d1d5db",
    },

    // FILL (width ALWAYS INLINE!)
    "&[data-part=fill]": {
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      borderRadius: "full",
      overflow: "hidden",
      background: "transparent",
      transition: "width 0.3s ease",
    },
  },

  variants: {
    size: {
      sm: {
        width: "40px",
        height: "16px",
        "&[data-part=cap-left], &[data-part=cap-right]": {
          width: "18%",
        },
      },
      md: {
        width: "60px",
        height: "22px",
        "&[data-part=cap-left], &[data-part=cap-right]": {
          width: "18%",
        },
      },
      lg: {
        width: "80px",
        height: "28px",
        "&[data-part=cap-left], &[data-part=cap-right]": {
          width: "18%",
        },
      },
      xl: {
        width: "110px",
        height: "36px",
        "&[data-part=cap-left], &[data-part=cap-right]": {
          width: "18%",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

export default tankIconRecipe;
