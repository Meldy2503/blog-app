"use client";

import React from "react";
import { Center, useColorMode } from "@chakra-ui/react";
import Sidebar from "../../../../components/sidebar";

const Drafts = () => {
  const { colorMode } = useColorMode();
  return (
    <Sidebar>
      <Center mt="15rem" color={colorMode === "dark" ? "#f5f6f6" : "#000"}>
        Coming soon
      </Center>
      ;
    </Sidebar>
  );
};

export default Drafts;
