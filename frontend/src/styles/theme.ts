import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Theme configuration for Chakra UI v2
// We explicitly set the initial color mode to dark and disable system
// preference detection. See Chakra docs for details【443354528693321†L117-L162】.
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// Extend the default Chakra theme with a custom brand palette and global styles.
// Colors are chosen to match the TON branding: neon blue on a dark background.
const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#e0f7ff",
      100: "#00baff",
      200: "#009de0",
      300: "#007bb3",
      400: "#005c8a",
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "#0b0b0b",
        color: "white",
      },
      a: {
        color: "brand.100",
        _hover: {
          textDecoration: "underline",
          color: "brand.200",
        },
      },
    },
  },
});

export default theme;