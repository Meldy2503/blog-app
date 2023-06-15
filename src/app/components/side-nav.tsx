"use client";

import { Input, useColorMode, Box, Text, Flex } from "@chakra-ui/react";
import React from "react";

const SideNav = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "light" ? "light" : "dark"}
      color={colorMode === "dark" ? "#bdbbbb" : "#737373"}
      w={{ base: "100%", lg: "33%" }}
      h="100%"
      py="1rem"
      px={{ base: "1rem", md: "2rem" }}
    >
      <Flex align={"center"} justify={"center"}>
        <Input
          display={{ base: "block", md: "none" }}
          w="20rem"
          placeholder="Search...."
          border={`1px solid ${
            colorMode === "dark" ? "rgb(255, 255, 255, .6)" : "#d0d0d0"
          }`}
          borderRadius="5px"
          focusBorderColor="none"
          ml="1rem"
          mb="1.5rem"
        />
      </Flex>
      <Text>
        ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
        ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
        ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </Text>
    </Box>
  );
};

export default SideNav;
