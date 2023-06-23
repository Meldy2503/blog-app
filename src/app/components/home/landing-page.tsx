import React from "react";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react";
import Button from "../button";

const LandingPage = () => {
  return (
    <Box
      bgImage="assets/bg1.jpg"
      h="90vh"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      w="100%"
    >
      <Flex
        align={"center"}
        justify={"center"}
        h="100%"
        bgGradient="linear(to-l,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4))"
      >
        <Box color="#fff" maxW="1100px" m="auto" w={{ base: "95%", md: "90%" }}>
          <Box w={{ base: "90%", sm: "75%", lg: "60%" }}>
            <Heading
              as={"h5"}
              fontSize={{
                base: "2rem",
                sm: "2.3rem",
                md: "2.7rem",
                lg: "3rem",
              }}
              fontWeight={600}
            >
              Welcome to Chatter: A Haven for Text-Based Content
            </Heading>
            <Text py="2rem">
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </Text>
            <Flex gap="1rem">
              <Button href="/pages/sign-up" bg="#543EE0" color="#fff">
                Get started{" "}
              </Button>
              <Button href="/pages/feed" bg="#543EE0" color="#fff">
                Feeds{" "}
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default LandingPage;
