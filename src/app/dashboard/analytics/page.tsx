"use client";

import React from "react";
import Sidebar from "../../../../components/sidebar";
import { Box, Heading, useColorMode, Center } from "@chakra-ui/react";

const Analytics = () => {
  const { colorMode } = useColorMode();
  return (
    <Sidebar>
      <Box
        bg={colorMode === "light" ? "#f7f6f6" : "#171923"}
        px={{ base: "1rem", md: "2rem" }}
        py="1rem"
        color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
        h="90vh"
      >
        <Box w={{ base: "100%", lg: "80%" }} m="auto" pt="2rem">
          <Heading
            as={"h5"}
            fontSize={{ base: "1.5rem", md: "1.7rem" }}
            fontWeight={600}
            color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            mb={".5rem"}
          >
            ANALYTICS{" "}
          </Heading>
          <Center mt="15rem" color={colorMode === "dark" ? "#f5f6f6" : "#000"}>
            Coming soon
          </Center>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default Analytics;
