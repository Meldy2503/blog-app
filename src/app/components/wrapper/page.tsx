import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex display="flex" align="center" justify="center">
      <Box maxW="120rem" m="auto" w="90%">
        {children}
      </Box>
    </Flex>
  );
};

export default Wrapper;
