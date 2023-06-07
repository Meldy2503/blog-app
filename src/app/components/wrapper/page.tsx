import React from "react";
import { Box } from "@chakra-ui/react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box w="100%">
      <Box maxW="1200px" m="auto" w={{ base: "95%", md: "90%" }}>
        {children}
      </Box>
    </Box>
  );
};

export default Wrapper;
