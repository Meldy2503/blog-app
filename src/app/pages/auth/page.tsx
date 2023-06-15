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
  Tabs,
  Tab,
  TabList,
  TabIndicator,
  TabPanels,
  TabPanel,
  useColorMode,
  Button,
  useColorModeValue,
  Switch,
} from "@chakra-ui/react";
import { Blur } from "../../components/blur-icon";
import Login from "../../components/sign-in";
import Register from "../../components/sign-up";

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
  const { colorMode, toggleColorMode } = useColorMode();

  return (
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
      >
        <Flex
          gap={{ base: 8, md: "2.5rem", lg: "4rem" }}
          direction={"column"}
          w={{ base: "100%", md: "45%" }}
        >
          <Heading
            bgGradient="linear(to-r, #543ee0, #543ee0)"
            bgClip="text"
            fontSize={{ base: "2.3rem", md: "2.7rem", lg: "3rem" }}
            mt={{ base: "0", md: "3rem" }}
          >
            CHATTER
          </Heading>{" "}
          <Text
            lineHeight={1.2}
            fontSize={{
              base: "1.6rem",
              sm: "1.8rem",
              md: "2rem",
              lg: "2.3rem",
            }}
            fontWeight={600}
          >
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </Text>
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
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
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
          p={{ base: 4, sm: 6 }}
          spacing={{ base: 8 }}
        >
          <Tabs position="relative" colorScheme="facebook">
            <TabList
              display={"flex"}
              justifyContent="space-between"
              w="80%"
              m="auto"
            >
              <Tab flex={1} fontWeight={600}>
                SIGN IN
              </Tab>
              <Tab flex={1} fontWeight={600}>
                REGISTER
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.3px"
              height="2.5px"
              bg="#543EE0"
              borderRadius="1px"
            />
            <TabPanels py="1rem">
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>
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
  );
}
