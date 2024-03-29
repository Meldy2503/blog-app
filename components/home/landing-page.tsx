import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import Button from "../button";
import { Blur } from "../utils/blur-icon";
import Wrapper from "../wrapper";
import { HeroImg } from "./hero-img";

const LandingPage = () => {
  const { colorMode } = useColorMode();

  return (
    <Wrapper
      bg={colorMode === "light" ? "light" : "dark"}
      color={colorMode === "dark" ? "#fff" : "#2b2b2b"}
    >
      <Blur
        position={"absolute"}
        zIndex="-1"
        top={300}
        right={-0}
        style={{ filter: "blur(60px)" }}
      />
      <Flex
        align={"center"}
        justify={{ base: "center", lg: "space-between" }}
        mt={{ base: "2rem", lg: "-4rem" }}
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "0", lg: "3rem" }}
      >
        <Box
          w={{ base: "100%", lg: "45%" }}
          textAlign={{ base: "center", lg: "left" }}
          className="slide-in-from-right"
        >
          <Heading
            as={"h5"}
            fontSize={{
              base: "3rem",
              sm: "3.3rem",
              md: "3.7rem",
              lg: "4rem",
            }}
            fontWeight={600}
            letterSpacing={1.3}
            lineHeight={1.2}
          >
            Welcome to Chatter
          </Heading>
          <Text fontSize={"1.7rem"}> A Haven for Text-Based Content</Text>
          <Text py="2rem">
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </Text>
          <Flex gap="1rem" justify={{ base: "center", lg: "flex-start" }}>
            <Button href="auth/sign-up" bg="#543EE0" color="#fff" w="8rem">
              Get started{" "}
            </Button>
            <Button href="/feed" bg="#543EE0" color="#fff" w="8rem">
              Feeds{" "}
            </Button>
          </Flex>
        </Box>

        <Flex
          w={{ base: "100%", lg: "45%" }}
          zIndex={"20"}
          align={"center"}
          justify={{ base: "center", lg: "end" }}
        >
          <HeroImg />
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default LandingPage;
