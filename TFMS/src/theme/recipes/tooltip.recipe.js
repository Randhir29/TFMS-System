// src/theme/recipes/tooltip.recipe.jsx
import { defineRecipe } from "@chakra-ui/react";

/**
 * tooltipRecipe
 * - Chakra v3 recipe (slots: content, arrow)
 * - Token-driven (no inline colors)
 * - Variants: size, colorScheme
 *
 * NOTE: defineRecipe returns a class generator that we call from the component:
 * const classes = tooltipRecipe({ size, colorScheme })
 * classes.content / classes.arrow are applied as className values.
 */
const tooltipRecipe = defineRecipe({
  className: "tfms-tooltip",
  slots: ["content", "arrow"],
  base: {
    content: {
      bg: "bgElevated",
      color: "text",
      borderColor: "border",
      borderWidth: "1px",
      borderRadius: "md",
      px: 3,
      py: 1,
      textStyle: "sm",
      boxShadow: "subtle",
      whiteSpace: "nowrap",
    },
    arrow: {
      bg: "bgElevated",
      width: "8px",
      height: "8px",
      // arrow is styled as a rotated square; visual alignment handled by chakra's Arrow component
      transform: "rotate(45deg)",
      // keep arrow visually above borders if needed
      borderRadius: "1px",
    },
  },
  variants: {
    size: {
      sm: {
        content: { px: 2, py: 0.5, textStyle: "xs" },
        arrow: { width: "6px", height: "6px" },
      },
      md: {
        content: { px: 3, py: 1, textStyle: "sm" },
        arrow: { width: "8px", height: "8px" },
      },
      lg: {
        content: { px: 4, py: 1.5, textStyle: "md" },
        arrow: { width: "10px", height: "10px" },
      },
    },
    colorScheme: {
      neutral: {},

      brand: {
        content: {
          bg: "gray.500",
          color: "textInverted",
          borderColor: "brand.500",
        },
        arrow: { bg: "gray.500" },
      },

      success: {
        content: {
          bg: "success",
          color: "textInverted",
          borderColor: "success",
        },
        arrow: { bg: "success" },
      },

      warning: {
        content: {
          bg: "warning",
          color: "textInverted",
          borderColor: "warning",
        },
        arrow: { bg: "warning" },
      },

      danger: {
        content: {
          bg: "error",
          color: "textInverted",
          borderColor: "error",
        },
        arrow: { bg: "error" },
      },
    },
  },
  defaultProps: {
    size: "md",
    colorScheme: "neutral",
  },
});

export default tooltipRecipe;
