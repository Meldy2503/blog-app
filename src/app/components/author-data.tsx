import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  Avatar,
  Button,
} from "@chakra-ui/react";

import Link from "next/link";

export const AuthorData = ({ size, href, px, name, src, occupation }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Link href={href}>
      <Flex align={"center"} gap="1rem" px={px} mt="1.5rem">
        <Box>
          <Avatar src={src} size={size} name={name} />
        </Box>
        <Box mt=".4rem">
          <Heading
            as={"h4"}
            fontSize={"1.1rem"}
            _hover={{ textDecoration: "underline" }}
            fontWeight={550}
            color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
          >
            {name}
          </Heading>
          <Flex align={"center"} gap=".5rem">
            <Text _hover={{ textDecoration: "underline" }}>{occupation}</Text>
            <Button
              color="#1c9334"
              fontSize={".9rem"}
              bg="transparent"
              _hover={{ bg: "transparent", textDecor: "underline" }}
            >
              follow
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Link>
  );
};

export default AuthorData;
