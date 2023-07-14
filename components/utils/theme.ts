// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#fff",
      150: "#bebbbb",
      200: "#e3e2e2",
      250: "rgba(255, 255, 255, .1)",
      300: "#F9FAFB",
      350: "#F7f6f6",
      400: "#d0d0d0",
      450: "#606477",
      500: "#ffedcc7f",
      600: "#543EE0",
      700: "#715fe3",
      750: "#2d3748",
      800: "#171923",
      850: "#2b2b2b",
      900: "#1a202c",
      950: "rgba(214, 209, 248, 0.2)",
    },
  },
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Ubuntu, sans-serif",
    // Add more custom font families as needed
  },
});

export default theme;
