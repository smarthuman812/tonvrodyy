import { extendTheme, theme as base } from "@chakra-ui/react";

const tonColors = {
  50: "#E0F7FF",
  100: "#B3ECFF",
  200: "#80DFFF",
  300: "#4DD2FF",
  400: "#1AC6FF",
  500: "#00BFFF", // основной неон TON
  600: "#0098EA",
  700: "#0077B6",
  800: "#005E94",
  900: "#003F66",
};

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    ton: tonColors,
    gray: base.colors.gray,
  },
  fonts: {
    heading: `'Space Grotesk', ${base.fonts.heading}`,
    body: `'Inter Tight', ${base.fonts.body}`,
  },
  styles: {
    global: {
      body: {
        bg: "linear-gradient(180deg, #0A0F1E 0%, #0D1425 100%)",
        color: "whiteAlpha.900",
      },
      "*": {
        scrollbarWidth: "none",
      },
      "*::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  shadows: {
    glow: "0 0 15px rgba(0, 191, 255, 0.3)",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "10px",
        fontWeight: 600,
        _hover: {
          boxShadow: "glow",
          transform: "scale(1.03)",
        },
        _active: {
          transform: "scale(0.97)",
        },
      },
      variants: {
        solid: {
          bg: "ton.500",
          color: "black",
          _hover: {
            bg: "ton.400",
          },
        },
      },
    },
  },
});

export default theme;
