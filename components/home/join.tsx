import React from "react";
import Wrapper from "../wrapper";
import Image from "next/image";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import Button from "../button";

const Join = () => {
  const { colorMode } = useColorMode();

  return (
    <Wrapper
      bg={colorMode === "dark" ? "dark" : "rgba(255, 237, 204, 0.498)"}
      color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
    >
      <Flex
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        align={"center"}
      >
        <Box w={{ base: "100%", md: "25%" }} mb={{ base: "2rem", md: "0rem" }}>
          <Image
            src="/assets/face-6.jpg"
            alt="about us image"
            style={{
              borderRadius: "50%",
              margin: "auto",
              objectFit: "cover",
            }}
            height={250}
            width={250}
          />
        </Box>
        <Box w={{ base: "100%", md: "70%" }} mb={{ base: "2rem", md: "0rem" }}>
          <Text>
            Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.
          </Text>
          <Flex mt="2.5rem" direction={{ base: "column", md: "row" }}>
            <Heading as={"h4"} fontSize={"1.2rem"} fontWeight={550}>
              Adebobola Muhydeen,
            </Heading>
            <Text
              fontSize={".9rem"}
              fontWeight={"400"}
              mt=".25rem"
              ml=".25rem"
              mb="1.7rem"
            >
              Software developer at Apple
            </Text>
          </Flex>
          <Button
            href="/auth/sign-up"
            bg="#543EE0"
            color="#fff"
            w="fit-content"
          >
            Join chatter
          </Button>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default Join;
