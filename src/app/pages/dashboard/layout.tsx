"use client";
import { Flex } from "@chakra-ui/react";
import Sidebar from "../../../app/components/sidebar";
import { Providers } from "../../../app/providers";
import SideNav from "@/app/components/side-nav";

export const metadata = {
  title: "Dashboard",
  description: "My dashboard",
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
          <Sidebar>
            <Flex
              align={{ base: "center", lg: "start" }}
              justify={{ base: "center", lg: "space-between" }}
              direction={{ base: "column-reverse", lg: "row" }}
              gap={{ base: "2rem", lg: "0rem" }}
              borderRadius={"3px"}
            >
              {children}
              <SideNav />
            </Flex>
          </Sidebar>
        </Providers>
      </body>
    </html>
  );
}
