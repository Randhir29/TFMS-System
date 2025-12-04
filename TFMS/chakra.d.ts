/// <reference types="react" />

declare module "@chakra-ui/react" {
  // ============================================================
  // THEME TOKEN AUTOCOMPLETE
  // ============================================================
  export interface ThemeTokens {
    colors:
      | "gray.50" | "gray.100" | "gray.200" | "gray.300" | "gray.400" | "gray.500"
      | "gray.600" | "gray.700" | "gray.800" | "gray.900"
      | "red.50" | "red.100" | "red.200" | "red.300" | "red.400" | "red.500"
      | "red.600" | "red.700" | "red.800" | "red.900"
      | "blue.50" | "blue.100" | "blue.200" | "blue.300" | "blue.400" | "blue.500"
      | "blue.600" | "blue.700" | "blue.800" | "blue.900";

    space: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16";
    sizes: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    fontSizes:
      | "xs" | "sm" | "md" | "lg"
      | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  }

  // ============================================================
  // RESPONSIVE PROPS SUPPORT
  // ============================================================
  export type Responsive<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

  // ============================================================
  // UNIVERSAL CHAKRA PROPS
  // ============================================================
  export interface ChakraProps {
    id?: string;
    className?: string;

    // Layout
    w?: Responsive<string | number>;
    h?: Responsive<string | number>;
    minW?: Responsive<string | number>;
    maxW?: Responsive<string | number>;
    minH?: Responsive<string | number>;
    maxH?: Responsive<string | number>;
    boxSize?: Responsive<string | number>;

    display?: Responsive<string>;
    overflow?: Responsive<string>;

    // Spacing
    m?: Responsive<string | number>;
    mt?: Responsive<string | number>;
    mb?: Responsive<string | number>;
    ml?: Responsive<string | number>;
    mr?: Responsive<string | number>;
    mx?: Responsive<string | number>;
    my?: Responsive<string | number>;

    p?: Responsive<string | number>;
    pt?: Responsive<string | number>;
    pb?: Responsive<string | number>;
    pl?: Responsive<string | number>;
    pr?: Responsive<string | number>;
    px?: Responsive<string | number>;
    py?: Responsive<string | number>;

    // Colors
    bg?: Responsive<string>;
    color?: Responsive<string>;

    // Flexbox
    align?: Responsive<string>;
    justify?: Responsive<string>;
    direction?: Responsive<string>;
    wrap?: Responsive<string>;

    // Borders
    border?: Responsive<string | number>;
    borderWidth?: Responsive<string | number>;
    borderColor?: Responsive<string>;
    borderRadius?: Responsive<string | number>;

    // Position
    pos?: Responsive<string>;
    top?: Responsive<string | number>;
    left?: Responsive<string | number>;
    right?: Responsive<string | number>;
    bottom?: Responsive<string | number>;

    // Typography
    fontSize?: Responsive<string | number>;
    fontWeight?: Responsive<string | number>;
    lineHeight?: Responsive<string | number>;

    // Shadow
    shadow?: Responsive<string>;
    boxShadow?: Responsive<string>;
  }

  // ============================================================
  // COMPONENTS (Box, Flex, Button, Input, Modal, etc.)
  // ============================================================
  export interface BoxProps extends ChakraProps {}
  export interface FlexProps extends BoxProps {}
  export interface GridProps extends BoxProps {}
  export interface StackProps extends BoxProps {}
  export interface TextProps extends BoxProps {}

  // BUTTON
  export interface ButtonProps extends BoxProps {
    colorScheme?:
      | "gray" | "red" | "yellow" | "green" | "blue"
      | "cyan" | "teal" | "purple" | "pink" | "orange";
    variant?:
      | "solid" | "outline" | "ghost" | "link" | "subtle" | "unstyled";
    size?: Responsive<"xs" | "sm" | "md" | "lg">;
  }

  export interface IconButtonProps extends ButtonProps {
    icon: any;
    "aria-label": string;
  }

  // INPUT
  export interface InputProps extends BoxProps {
    variant?: "outline" | "filled" | "flushed" | "unstyled";
    size?: Responsive<"sm" | "md" | "lg">;
  }

  export interface SelectProps extends InputProps {}
  export interface TextareaProps extends InputProps {}

  // ALERT
  export interface AlertProps extends BoxProps {
    status?: "info" | "warning" | "success" | "error";
    variant?: "subtle" | "left-accent" | "top-accent" | "solid";
  }

  // CARD
  export interface CardProps extends BoxProps {
    variant?: "outline" | "elevated" | "unstyled";
  }

  // TABLE
  export interface TableProps extends BoxProps {
    variant?: "simple" | "striped" | "unstyled";
    size?: Responsive<"sm" | "md" | "lg">;
  }
}

//
// ============================================================
// FRAMER-MOTION SUPPORT FOR CHAKRA COMPONENTS
// ============================================================
//

declare module "framer-motion" {
  export interface MotionChakraProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
  }
}

declare module "@chakra-ui/react" {
  export function motion<T>(component: T): T & { motionProps?: any };
}
