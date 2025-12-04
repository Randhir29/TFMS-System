// src/theme.js
import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSemanticTokens,
  defineTextStyles,
  defineTokens
} from "@chakra-ui/react";
import sidebarRecipe from "./recipes/sidebar.recipe.js";
import sidebarIconRecipe from "./recipes/sidebarIcon.recipe.js";
import sidebarItemRecipe from "./recipes/sidebarItem.recipe.js";
import tooltipRecipe from "./recipes/tooltip.recipe.js";

const tokens = defineTokens({
  colors: {
    brand: {
      50: { value: "#e7f2ff" },
      100: { value: "#c2dbff" },
      200: { value: "#9bc4ff" },
      300: { value: "#74adff" },
      400: { value: "#4d96ff" },
      500: { value: "#347de6" },
      600: { value: "#265fb4" },
      700: { value: "#194282" },
      800: { value: "#0b2551" },
      900: { value: "#000a22" },
    },
    gray: {
      50: { value: "#f9fafb" },
      100: { value: "#f3f4f6" },
      200: { value: "#e5e7eb" },
      300: { value: "#d1d5db" },
      400: { value: "#9ca3af" },
      500: { value: "#6b7280" },
      600: { value: "#4b5563" },
      700: { value: "#374151" },
      800: { value: "#1f2937" },
      900: { value: "#111827" },
    },
    success: {
      50: {value:"#ecfdf5"},
      100: {value:"#d1fae5"},
      200: {value:"#a7f3d0"},
      300: {value:"#6ee7b7"},
      400: {value:"#34d399"},
      500: {value:"#10b981"},
      600: {value:"#059669"},
      700: {value:"#047857"},
      800: {value:"#065f46"},
      900: {value:"#064e3b"},
    },
    warning: {
      50: {value:"#fffbeb"},
      100: {value:"#fef3c7"},
      200: {value:"#fde68a"},
      300: {value:"#fcd34d"},
      400: {value:"#fbbf24"},
      500: {value:"#f59e0b"},
      600: {value:"#d97706"},
      700: {value:"#b45309"},
      800: {value:"#92400e"},
      900: {value:"#78350f"},
    },
    error: {
      50: {value:"#fef2f2"},
      100: {value:"#fee2e2"},
      200: {value:"#fecaca"},
      300: {value:"#fca5a5"},
      400: {value:"#f87171"},
      500: {value:"#ef4444"},
      600: {value:"#dc2626"},
      700: {value:"#b91c1c"},
      800: {value:"#991b1b"},
      900: {value:"#7f1d1d"},
    },
    accent: {
      50: {value:"#f5f3ff"},
      100: {value:"#ede9fe"},
      200: {value:"#ddd6fe"},
      300: {value:"#c4b5fd"},
      400: {value:"#a78bfa"},
      500: {value:"#8b5cf6"},
      600: {value:"#7c3aed"},
      700: {value:"#6d28d9"},
      800: {value:"#5b21b6"},
      900: {value:"#4c1d95"},
    },
    pink: {
    50:  { value: "#ffe4f0" },  // very light, bright pink
    100: { value: "#ffb8d2" },  // soft candy pink
    200: { value: "#ff8ab5" },  // lively bubblegum pink
    300: { value: "#ff5c98" },  // hot pink
    400: { value: "#ff2e7b" },  // neon pink
    500: { value: "#e60063" },  // strong magenta-pink
    600: { value: "#b8004f" },  // deeper vibrant pink
    700: { value: "#8a003b" },  // dark fuchsia
    800: { value: "#5c0027" },  // wine-pink tone
    900: { value: "#2e0013" },  // very dark pink base
  },
},
  gradients: {
    brand: "linear-gradient(90deg, #74adff 0%, #347de6 100%)",
    success: "linear-gradient(90deg, #6ee7b7 0%, #10b981 100%)",
    warning: "linear-gradient(90deg, #fcd34d 0%, #f59e0b 100%)",
    error: "linear-gradient(90deg, #fca5a5 0%, #ef4444 100%)",
    accent: "linear-gradient(90deg, #c4b5fd 0%, #8b5cf6 100%)",
    gray: "linear-gradient(90deg, #f3f4f6 0%, #9ca3af 100%)",
    sunrise: "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)",
    ocean: "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)",
    aurora: "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)",
    neon: "linear-gradient(90deg, #f953c6 0%, #b91d73 100%)",
    pinkVibrant: "linear-gradient(90deg, #f953c6 0%, #b91d73 100%)",
    modernA: "linear-gradient(90deg, #00d2ff 0%, #6a11cb 50%, #ff0099 100%)",
    modernB: "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%)",
    modernC: "linear-gradient(90deg, #00f5a0 0%, #00d2ff 50%, #6a11cb 100%)",
    modernD:"linear-gradient(90deg, #005B96 0%,  #FF4DA6 33%, #F6CD61 66%, #011F4B 100%)",
    modernE:"linear-gradient(90deg, #00d2ff 0%, #ff0099 33%, #9dff00 66%, #ffb700 100%)",
    modernF:"linear-gradient(90deg, #FF6B6B 0%, #FFD93B 33%, #6EE7B7 66%, #10B981 100%)",
    modernG:"linear-gradient(90deg, #6a11cb 0%, #2575fc 33%, #ff0099 66%, #ef4444 100%)",
    modernH:"linear-gradient(90deg, #0E9AA7 0%, #3DA4AB 33%, #F6CD61 66%, #FE8A71 100%)", 
  },
});

const semanticTokens = defineSemanticTokens({
  colors: {
    // Backgrounds
    bg: {
      value: "{colors.gray.50}",
      _dark: "{colors.gray.900}",
    },
    bgSubtle: {
      value: "{colors.gray.100}",
      _dark: "{colors.gray.800}",
    },
    bgElevated: {
      value: "{colors.gray.200}",
      _dark: "{colors.gray.700}",
    },

    // Text
    text: {
      value: "{colors.gray.800}",
      _dark: "{colors.gray.100}",
    },
    textSubtle: {
      value: "{colors.gray.600}",
      _dark: "{colors.gray.400}",
    },
    textInverted: {
      value: "{colors.gray.50}",
      _dark: "{colors.gray.900}",
    },
    textAccent: {
      value: "{colors.brand.600}",
      _dark: "{colors.brand.300}",
    },

    // Primary / Brand
    primary: {
      value: "{colors.gray.700}",
      _dark: "{colors.gray.300}",
    },
    primaryHover: {
      value: "{colors.brand.600}",
      _dark: "{colors.brand.400}",
    },
    primaryActive: {
      value: "{colors.brand.700}",
      _dark: "{colors.brand.500}",
    },
    primaryGradient: {
      value: "{gradients.neon}",
      _dark: "{gradients.ocean}",
    },

    // Semantic feedback
    success: {
      value: "{colors.success.500}",
      _dark: "{colors.success.300}",
    },
    successGradient: {
      value: "{gradients.success}",
      _dark: "{gradients.aurora}",
    },
    warning: {
      value: "{colors.warning.500}",
      _dark: "{colors.warning.300}",
    },
    warningGradient: {
      value: "{gradients.warning}",
      _dark: "{gradients.sunrise}",
    },
    error: {
      value: "{colors.error.500}",
      _dark: "{colors.error.300}",
    },
    errorGradient: {
      value: "{gradients.error}",
      _dark: "{gradients.neon}",
    },

    // Borders
    border: {
      value: "{colors.gray.200}",
      _dark: "{colors.gray.700}",
    },
    borderFocus: {
      value: "{colors.brand.400}",
      _dark: "{colors.brand.300}",
    },
    borderGradient: {
      value: "{gradients.gray}",
      _dark: "{gradients.brand}",
    },

    // Accents / Highlights
    accentAurora: {
      value: "{gradients.aurora}",
      _dark: "{gradients.neon}",
    },
    accentSunrise: {
      value: "{gradients.sunrise}",
      _dark: "{gradients.ocean}",
    },
    accentHighlight: {
      value: "{gradients.accent}",
      _dark: "{gradients.brand}",
    },
  },
});

//Define a recipe for Button
const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    fontWeight: "semibold",
    borderRadius: "md",
    transition: "all 0.25s ease",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    _disabled: {
      opacity: 0.6,
      cursor: "not-allowed",
      boxShadow: "none",
      transform: "none",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "brand.600",
        color: "white",
        shadow: "sm",
        borderRadius: "full",
        w:"50%",
        h:"65px",
        filter: "brightness(1.05)",
        transition: "all 0.2s ease-in-out",
        _hover: { 
          bg: "brand.700", 
          shadow: "md", 
          color:"gray.100",
        transform: "scale(1.03)",},
        _active: { 
          bg: "brand.600", 
          transform: "scale(0.95)",
          outline: "3px solid",
          outlineColor: "brand.500",},
      },
      gradient: {
  background: "linear-gradient(135deg, {colors.brand.400} 0%, {colors.brand.700} 100%)",
  color: "white",
  shadow: "sm",
  border: "none",
  transition: "all 0.25s ease",

  _hover: {
    shadow: "md",
    filter: "brightness(1.08)",
    transform: "translateY(-1px)",
  },

  _active: {
    shadow: "sm",
    filter: "brightness(0.98)",
    transform: "translateY(0)",
  },

  _disabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    shadow: "none",
    transform: "none",
  },
},
      outline: {
        border: "2px solid",
        borderColor: "brand.500",
        color: "brand.600",
        bg: "transparent",
        _hover: {
          bg: "brand.50",
        },
        _active: {
          bg: "brand.100",
        },
      },
      soft: {
        bg: "brand.50",
        color: "brand.700",
        _hover: { bg: "brand.100" },
        _active: { bg: "brand.200" },
      },
      glass: {
        background: "{gradients.pinkVibrant}",
        backdropFilter: "blur(12px)",
        border: "1px solid",
        borderColor: "gray.700",
        color: "white",
        shadow: "lg",
        _hover: { opacity: 0.9 },
      },
      neumorphic: {
        bg: "gray.100",
        color: "gray.700",
        borderRadius: "xl",
        boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
        _hover: {
          boxShadow: "inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff",
        },
      },
      glow: {
        bg: "transparent",
        border: "2px solid",
        borderColor: "brand.500",
        color: "brand.600",
        boxShadow: "0 0 6px {colors.brand.400}",
        _hover: { boxShadow: "0 0 12px {colors.brand.500}" },
      },
      success: {
        background: "linear-gradient(90deg, {colors.success.300} 0%, {colors.success.500} 100%)",
        color: "white",
        _hover: { transform: "scale(1.03)" },
        _active: { transform: "scale(0.97)" },
      },
      warning: {
        background: "linear-gradient(90deg, {colors.warning.300} 0%, {colors.warning.500} 100%)",
        color: "white",
        _hover: { transform: "scale(1.03)" },
        _active: { transform: "scale(0.97)" },
      },
      error: {
        background: "linear-gradient(90deg, {colors.error.300} 0%, {colors.error.500} 100%)",
        color: "white",
        _hover: { transform: "scale(1.03)" },
        _active: { transform: "scale(0.97)" },
      },
      accent: {
        background: "linear-gradient(90deg, {colors.accent.300} 0%, {colors.accent.500} 100%)",
        color: "white",
        _hover: { transform: "scale(1.03)" },
        _active: { transform: "scale(0.97)" },
      },
     minimal: {
      bg: "transparent",              // no background
      filter: "brightness(1.2)",      // brighten overall
      color: "whiteAlpha.800",        // higher contrast on frosted bg
      fontWeight: "medium",
      transition: "all 0.2s ease",

    _hover: {
      color: "white",               // brighter on hover
      bg: "transparent",
      filter: "brightness(3)",    // extra brightness on hover
    },

    _active: {
      color: "whiteAlpha.800",      // slightly dimmer when pressed
      bg: "transparent",
      transform: "none",
      filter: "brightness(1.1)",
    },

    _focusVisible: {
      outline: "2px solid",
      outlineColor: "brand.500",
      boxShadow: "0 0 0 2px rgba(66,153,225,0.4)",
  },
},
      animated: {
        bg: "brand.500",
        color: "white",
        transition: "all 0.2s ease-in-out",
        _hover: { transform: "scale(1.06)", shadow: "lg" },
        _active: { transform: "scale(0.95)" },
      },
      sunrise: {
        background: "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)",
        color: "white",
        _hover: { transform: "scale(1.03)", shadow: "lg" },
        _active: { transform: "scale(0.97)" },
      },
      ocean: {
        background: "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)",
        color: "white",
        _hover: { transform: "scale(1.03)", shadow: "lg" },
        _active: { transform: "scale(0.97)" },
      },
      aurora: {
        background: "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)",
        color: "white",
        _hover: { transform: "scale(1.03)", shadow: "lg" },
        _active: { transform: "scale(0.97)" },
      },
      neon: {
        background: "linear-gradient(90deg, #f953c6 0%, #b91d73 100%)",
        color: "white",
        _hover: { transform: "scale(1.03)", shadow: "lg" },
        _active: { transform: "scale(0.97)" },
      },
      passwordIcon: {
        border: "none",
        bg: "transparent",                  // transparent so input background shows
        backdropFilter: "none",
        color: "gray.200",                     // icon color
        transition: "transform 150ms ease",
        _hover: {
          transform: "scale(1.20)",
        },
        _active: {
          transform: "scale(0.96)",
        },
      },
 
    },
    size: {
      sm: {
        px: "3",
        py: "1.5",
        fontSize: "sm",
      },
      md: {
        px: "4",
        py: "2",
        fontSize: "md",
      },
      lg: {
        px: "6",
        py: "3",
        fontSize: "lg",
      },
      xl: {
        px: "6",
        py: "6",
        fontSize: "xl",
      },
    },
  },
  defaultVariants: {
    variant: "gradient",
    size: "md",
  },
});


const textStyles = defineTextStyles({
  headline: {
    description: "Big bold heading style for hero sections",
    value: {
      fontSize: "6xl",
      fontWeight: "bold",
      lineHeight: "1.5",
      letterSpacing: "-0.02em",
      color: "gray.50",
    },
  },
  subheading: {
    description: "Secondary heading style for section titles",
    value: {
      fontSize: "5xl",
      fontWeight: "bold",
      lineHeight: "1.3",
      letterSpacing: "-0.02em",
      color: "gray.50",
    },
  },
  bodyText: {
    description: "Standard body text for paragraphs",
    value: {
      fontSize: "md",
      lineHeight: "1.6",
      color: "gray.50",
    },
  },
  bodySubtle: {
    description: "Muted body text for secondary information",
    value: {
      fontSize: "sm",
      lineHeight: "1.5",
      color: "gray.500",
    },
  },
  caption: {
    description: "Small caption text for labels or metadata",
    value: {
      fontSize: "xs",
      lineHeight: "1.4",
      color: "gray.400",
      letterSpacing: "0.02em",
    },
  },
  link: {
    description: "Interactive link style",
    value: {
      fontSize: "md",
      fontWeight: "medium",
      lineHeight: "1.5",
      color: "brand.500",
      textDecoration: "underline",
    },
  },
  buttonText: {
    description: "Text style for buttons",
    value: {
      fontSize: "sm",
      fontWeight: "semibold",
      lineHeight: "1.4",
      letterSpacing: "0.01em",
      color: "white",
    },
  },
});

export const config = defineConfig({
  theme: {
    tokens,
    semanticTokens,
    textStyles,
    fonts: {
      heading: "Inter, Arial, sans-serif",
      body: "Roboto, Helvetica, sans-serif",
      mono: "Fira Code, monospace",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    radii: {
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "1rem",
      full: "9999px",
    },
    shadows: {
      subtle: "0 1px 2px rgba(0,0,0,0.05)",
      elevated: "0 4px 6px rgba(0,0,0,0.1)",
      intense: "0 10px 15px rgba(0,0,0,0.2)",
      glow: "0 0 10px rgba(52,125,230,0.6)",
    },
    recipes: {
      button: buttonRecipe,
      tooltip: tooltipRecipe,
      sidebar: sidebarRecipe,
      sidebarItem: sidebarItemRecipe,
      sidebarIcon: sidebarIconRecipe,
      },
  },
});

export const system = createSystem(defaultConfig, config);
