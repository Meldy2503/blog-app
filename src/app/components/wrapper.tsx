import React from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  bg?: string;
  color?: string;
  children: React.ReactNode;
  py?: string;
}

const Wrapper = ({ children, bg, color, py }: Props) => {
  return (
    <Box w="100%" bg={bg} color={color}>
      <Box
        maxW="1100px"
        m="auto"
        w={{ base: "95%", md: "90%" }}
        py={py || { base: "2rem", md: "4rem" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Wrapper;
