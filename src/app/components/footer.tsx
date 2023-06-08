import { ReactNode } from "react";

import { Box, Link, Stack, Text, Flex } from "@chakra-ui/react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"600"} fontSize={"1.2rem"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoLeft() {
  return (
    <Box bg="rgba(255, 237, 204, 0.5)" pt="3rem" pb="2rem">
      <Box
        maxW="1100px"
        m="auto"
        w={{ base: "95%", md: "90%" }}
        color="#111111"
      >
        <Flex justify="space-between" flexWrap="wrap" gap="2rem">
          <Stack>
            <Text color="#543EE0" fontWeight={700} fontSize="1.8rem">
              CHATTER
            </Text>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Explore</ListHeader>
            <Link href={"#"}>Community</Link>
            <Link href={"#"}>Trending blogs</Link>
            <Link href={"#"}>Chatter for teams</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Support docs</Link>
            <Link href={"#"}>Join slack</Link>
            <Link href={"#"}>Contact</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Official blog</ListHeader>
            <Link href={"#"}>Official blog</Link>
            <Link href={"#"}>Engineering blog</Link>
          </Stack>
        </Flex>
      </Box>
      <Flex
        borderTop=".5px solid #d0d0d0"
        justify="center"
        align="center"
        mt="2rem"
      >
        <Text fontSize={"sm"} maxW="1200px" textAlign="center" mt="1.2rem">
          © 2023 Emelder Okafor. All rights reserved
        </Text>
      </Flex>
    </Box>
  );
}
