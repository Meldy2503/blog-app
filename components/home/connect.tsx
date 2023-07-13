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

const Connect = () => {
  const { colorMode } = useColorMode();

  return (
    <Wrapper
      bg={colorMode === "light" ? "#fff" : "dark"}
      color={colorMode === "dark" ? "#bebbbb" : "#2b2b2b"}
    >
      <Flex justify="space-between" direction={{ base: "column", md: "row" }}>
        <Flex
          w={{ base: "100%", md: "40%" }}
          align={"center"}
          gap="4rem"
          justify={"center"}
          mb={{ base: "2rem", md: "0rem" }}
        >
          <VStack spacing="4rem">
            <Image
              src="/assets/face-1.jpg"
              alt="about us image"
              style={{
                borderRadius: "50%",
              }}
              height={160}
              width={160}
            />
            <Image
              src="/assets/face-5.jpg"
              alt="about us image"
              style={{
                borderRadius: "50%",
              }}
              height={160}
              width={160}
            />
          </VStack>
          <VStack>
            <Image
              src="/assets/face-3.jpg"
              alt="about us image"
              style={{
                borderRadius: "50%",
              }}
              height={160}
              width={160}
            />
          </VStack>
        </Flex>
        <Box w={{ base: "100%", md: "55%" }} mb={{ base: "2rem", md: "0rem" }}>
          <Heading
            as={"h5"}
            fontSize={{ base: "1.9rem", md: "2.1rem", lg: "2.3rem" }}
            fontWeight={600}
            color={colorMode === "dark" ? "#e3e2e2" : "black"}
          >
            Write, read and connect with great minds on Chatter
          </Heading>
          <Text py="2rem">
            Share your breakthrough concepts and revolutionary ideas with a
            community eager to embrace innovation. Explore a rich collection of
            captivating write-ups tailored to your specific interests, expanding
            your knowledge and stimulating your intellect. Connect effortlessly
            with like-minded individuals who share your passions, aspirations,
            and ambitions, forging lifelong connections and collaborations that
            will drive you towards mutual success.
          </Text>
          <Button
            href="/auth/sign-up"
            bg="#543EE0"
            color="#fff"
            w="fit-content"
          >
            Get started{" "}
          </Button>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default Connect;
