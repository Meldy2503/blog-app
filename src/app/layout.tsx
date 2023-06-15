"use client";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import theme from "@/app/components/utils/theme";
import { ColorModeScript } from "@chakra-ui/react";

import { Providers } from "../app/providers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* <Navbar /> */}
          {/* <Stack align='center' direction='row'> */}
          {/* <Switch size='md' /> */}
          {/* <Switch size='lg' /> */}
          {/* </Stack> */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
