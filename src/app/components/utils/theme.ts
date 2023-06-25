// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#fff",
      200: "#fff",
      300: "#F9FAFB",
      400: "#d0d0d0",
      450: "#606477",
      500: "#ffedcc7f",
      600: "#543EE0",
      700: "#715fe3",
      800: "#171923",
      900: "#1a202c",
    },
  },
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Ubuntu, sans-serif",
    // Add more custom font families as needed
  },
});

export default theme;
