"use client";

import { Stack, Box, Flex, useColorMode } from "@chakra-ui/react";
import LogIn from "../../../../components/sign-in";
import UserNavbar from "../../../../components/user-nav";
import { Blur } from "../../../../components/utils/blur-icon";
import FormLeftContent from "../../../../components/form-right-content";

export default function JoinOurTeam() {
  const { colorMode } = useColorMode();

  return (
    <>
      <UserNavbar />
      <Box
        position={"relative"}
        bg={colorMode === "light" ? "light" : "dark"}
        color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
      >
        <Flex
          maxW={"1200px"}
          w={{ base: "95%", md: "90%" }}
          direction={{ base: "column", md: "row" }}
          py="2rem"
          m="auto"
          justify={"space-between"}
          align="center"
        >
          <FormLeftContent />
          <Stack
            bg={colorMode === "light" ? "gray.50" : "#2d3748"}
            border={`1px solid ${colorMode === "dark" ? "none" : "#e2e8f0"}`}
            rounded={"xl"}
            w={{ base: "100%", md: "50%" }}
            mt={{ base: "2rem", md: "1.5rem" }}
            py="3rem"
            px={{ base: "1rem", sm: "2rem", md: "3rem" }}
            spacing={{ base: 8 }}
          >
            <LogIn />
          </Stack>
        </Flex>
        <Blur
          position={"absolute"}
          zIndex="-1"
          top={-10}
          left={-10}
          style={{ filter: "blur(60px)" }}
        />
      </Box>
    </>
  );
}
