import React from "react";
import Wrapper from "../wrapper/page";
import Image from "next/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <Wrapper bg="#f7f6f6">
      <Flex justify={"space-between"} direction={{ base: "column", md: "row" }}>
        <Box
          w={{ base: "100%", md: "55%", lg: "47%" }}
          mb={{ base: "2rem", md: "0rem" }}
        >
          <Heading
            as={"h5"}
            fontSize={{ base: "1.9rem", md: "2.1rem", lg: "2.3rem" }}
            fontWeight={600}
            color="black"
            mb={"1rem"}
          >
            About Chatter
          </Heading>
          <Text>
            Chatter is a multi-functional platform where authors and readers can
            have access to their own content. It aims to be a traditional
            bookworm’s heaven and a blog to get access to more text based
            content. Our vision is to foster an inclusive and vibrant community
            where diversity is celebrated. We encourage open-mindedness and
            respect for all individuals, regardless of their backgrounds or
            beliefs. By promoting dialogue and understanding, we strive to
            create a safe space for everyone to share their thoughts and ideas.
          </Text>
        </Box>
        <Box w={{ base: "100%", md: "40%", lg: "47%" }}>
          <Image
            src="/assets/signup.jpg"
            alt="about us image"
            style={{
              borderRadius: ".5rem",
              margin: "auto",
            }}
            height={600}
            width={600}
          />
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default AboutUs;
