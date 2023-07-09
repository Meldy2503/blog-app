"use client";

import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import Button from "../../../../components/button";
import Image from "next/image";
import { VscBook } from "react-icons/vsc";
import { MdOutlineAnalytics } from "react-icons/md";
import { BiChat } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

const Analytics = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      w={{ base: "100%", lg: "67%" }}
      bg={colorMode === "light" ? "#f7f6f6" : "#171923"}
      px={{ base: "1rem", md: "2rem" }}
      py="1rem"
      color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
    >
      {" "}
      <Box>
        <Heading
          as={"h5"}
          fontSize={{ base: "1.3rem", md: "1.5rem" }}
          fontWeight={600}
          color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
          mb={"1rem"}
        >
          POSTS ANALYTICS
        </Heading>
        <Text color={colorMode === "dark" ? "#d0d0d0" : "#111111"} mb=".6rem">
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {" "}
            May 2023,
          </span>{" "}
          25days so far{" "}
        </Text>
        <Box borderTop="3px solid #543EE0" pt="1rem" pb="2rem">
          <Text
            fontSize="1.5rem"
            fontWeight="bold"
            mb="1.5rem"
            color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
          >
            Posts highlights
          </Text>
          <Flex align={"center"} gap="1.5rem">
            <Box>
              <Image
                src="/assets/face-1.jpg"
                alt="a person's face"
                style={{
                  borderRadius: "50%",
                }}
                height={120}
                width={120}
              />
            </Box>
            <Box>
              <Heading
                as={"h4"}
                fontSize={"1.3rem"}
                fontWeight={550}
                color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
                mb=".5rem"
              >
                Grace Ikpang{" "}
              </Heading>
              <Text>Product designer,May 25th, 2023</Text>
            </Box>
          </Flex>
          <Box mb="1rem" mt="1.5rem">
            <Heading
              as={"h5"}
              fontSize={"1.5rem"}
              fontWeight={550}
              color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
            >
              Starting out as a Product designer
            </Heading>
            <Flex align={"center"} gap=".5rem" mb="1rem" mt=".7rem">
              <Icon
                as={VscBook}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />

              <Text fontSize={".9rem"}>10 mins read</Text>
            </Flex>
            <Text>
              Embarking on a journey as a product designer can be an
              exhilarating and fulfilling experience. As a profession that
              bridges the realms of art, technology, and problem-solving,
              product design offers an opportunity to shape the way people
              interact with the world around them.
            </Text>
          </Box>
          <Box>
            <Image
              src="/assets/feed.png"
              alt="feed image"
              style={{
                objectFit: "cover",
              }}
              height={500}
              width={500}
            />{" "}
          </Box>
          <Flex mt="1rem" justify={"space-between"} align={"center"}>
            <HStack>
              <Icon
                as={BiChat}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />
              <Text fontSize={".9rem"}>110</Text>
            </HStack>
            <HStack>
              <Icon
                as={AiOutlineHeart}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />
              <Text fontSize={".9rem"}>20 likes</Text>
            </HStack>
            <HStack>
              <Icon
                as={MdOutlineAnalytics}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />
              <Text fontSize={".9rem"}>2000 views</Text>
            </HStack>
          </Flex>
        </Box>
        <Button href="/sign-up" bg="#543EE0" color="#fff">
          View post activity{" "}
        </Button>
        <Box borderBottom="3px solid #543EE0" mt="4rem">
          <Heading
            as={"h5"}
            fontSize="1.4rem"
            fontWeight={600}
            color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
            mb={".8rem"}
          >
            Posts Summary{" "}
          </Heading>
          <Text color={colorMode === "dark" ? "#d0d0d0" : "#111111"} mb=".6rem">
            May 2023 summary
          </Text>
        </Box>
        <Flex
          mt="1.5rem"
          justify={"space-between"}
          align={"center"}
          flexWrap={"wrap"}
          gap="1rem"
        >
          <HStack fontSize={"1.1rem"}>
            <Text>Profile visits</Text>
            <Text
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              fontWeight={"600"}
            >
              50
            </Text>
          </HStack>
          <HStack fontSize={"1.1rem"}>
            <Text>New followers</Text>
            <Text
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              fontWeight={"600"}
            >
              5
            </Text>
          </HStack>

          <HStack fontSize={"1.1rem"}>
            <Text>Posts</Text>
            <Text
              fontWeight={"600"}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            >
              3
            </Text>
          </HStack>
          <HStack fontSize={"1.1rem"}>
            <Text>Posts Impressions</Text>
            <Text
              fontWeight={"600"}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            >
              200
            </Text>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Analytics;
