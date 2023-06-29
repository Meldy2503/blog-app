"use client";

import {
  Stack,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Box,
  Heading,
  Text,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { Blur } from "../../../components/utils/blur-icon";
import Login from "../../../components/sign-in";
import UserNavbar from "../../../components/user-nav";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

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
          <Flex
            gap={{ base: 8, md: "2.5rem", lg: "4rem" }}
            direction={"column"}
            w={{ base: "100%", md: "45%" }}
          >
            <Heading
              lineHeight={1.4}
              fontSize={{
                base: "1.8rem",
                sm: "2rem",
                md: "2.3rem",
                lg: "2.5rem",
              }}
              letterSpacing={".1rem"}
              fontWeight={600}
            >
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </Heading>
            <Stack
              direction={{ base: "row", md: "column", lg: "row" }}
              spacing="0rem"
              align={"center"}
              justify={"flex-start"}
            >
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    size={{ base: "md", md: "lg" }}
                    position={"relative"}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: "full",
                      height: "full",
                      rounded: "full",
                      transform: "scale(1.125)",
                      bgGradient: "linear(to-bl, #543ee0,#543ee0)",
                      position: "absolute",
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text
                fontFamily={"heading"}
                fontSize={{ base: "4xl", md: "6xl" }}
              >
                +
              </Text>
              <Flex
                align={"center"}
                justify={"center"}
                fontFamily={"heading"}
                fontSize={{ base: "sm", md: "lg" }}
                bg={"gray.800"}
                color={"white"}
                rounded={"full"}
                minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
                minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
                position={"relative"}
                _before={{
                  content: '""',
                  width: "full",
                  height: "full",
                  rounded: "full",
                  transform: "scale(1.125)",
                  bgGradient: "linear(to-bl, orange.400,#b9811a7e)",
                  position: "absolute",
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                YOU
              </Flex>
            </Stack>
          </Flex>
          <Stack
            bg={colorMode === "light" ? "gray.50" : "#2d3748"}
            border={`1px solid ${colorMode === "dark" ? "none" : "#e2e8f0"}`}
            rounded={"xl"}
            w={{ base: "100%", md: "50%" }}
            mt={{ base: "2rem", md: "1.5rem" }}
            p="3rem"
            spacing={{ base: 8 }}
          >
            <Login />
          </Stack>
        </Flex>
        <Blur
          position={"absolute"}
          zIndex="1"
          top={-10}
          left={-10}
          style={{ filter: "blur(60px)" }}
        />
      </Box>
    </>
  );
}
