"use client";

import {
  Input,
  useColorMode,
  Box,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideNav = ({ bg, px, btnBg }: any) => {
  const { colorMode } = useColorMode();

  const data = [
    {
      id: 1,
      name: "Politics",
    },
    {
      id: 2,
      name: "Programming",
    },
    {
      id: 3,
      name: "Data Science",
    },
    {
      id: 4,
      name: "Relationships",
    },
    {
      id: 5,
      name: "Technology",
    },
    {
      id: 6,
      name: "Artificial Intelligence",
    },
  ];

  const follow = [
    {
      id: 1,
      name: "Anthony Smith",
      title: "programmer",
      src: "/assets/face-1.jpg",
    },
    {
      id: 2,
      name: "Mary Megan",
      title: "Writer",
      src: "/assets/face-5.jpg",
    },
    {
      id: 3,
      name: "Victor Omondi",
      title: "Architect",
      src: "/assets/face-6.jpg",
    },
  ];

  return (
    <Box
      bg={bg}
      color={colorMode === "dark" ? "#bdbbbb" : "#737373"}
      w={{ base: "100%", md: "45%" }}
      py="1rem"
      px={px}
      pl={{ base: "1rem", md: "2rem" }}
      position="sticky"
      top="0px"
      h="100%"
    >
      <Flex align={"center"} justify={"center"}>
        <Input
          display={{ base: "block", md: "none" }}
          w="20rem"
          placeholder="Search...."
          border={`1px solid ${
            colorMode === "dark" ? "rgb(255, 255, 255, .6)" : "#d0d0d0"
          }`}
          borderRadius="5px"
          focusBorderColor="none"
          ml="1rem"
          mb="1.5rem"
        />
      </Flex>
      <Box>
        <Text
          fontSize="1.2rem"
          fontWeight="bold"
          mb="1rem"
          color={colorMode === "light" ? "#252525" : "#d0d0d0"}
        >
          Recommended topics
        </Text>
        <Flex gap="1rem" flexWrap={"wrap"}>
          {data.map((item) => {
            return (
              <Text
                key={item.id}
                bg={btnBg}
                // bg={colorMode === "dark" ? "#2d3748" : "#f5f4f4"}
                py=".2rem"
                px=".9rem"
                borderRadius="20px"
                fontSize=".9rem"
              >
                {item.name}
              </Text>
            );
          })}
        </Flex>

        <Box bg="#543ee0d0" color="#fff" p="1rem" mt="2.5rem">
          <Text fontSize="1.2rem" fontWeight="bold" mb="1rem">
            Write on Chatter
          </Text>
          <Text>
            Express yourself and connect with others by writing and sharing your
            stories with the world.
          </Text>
          <Box
            bg="#f8f3f3"
            py=".3rem"
            px="1.3rem"
            borderRadius="20px"
            color="#000"
            fontWeight={600}
            mt="1rem"
            w="fit-content"
            fontSize={".9rem"}
          >
            <Link href="/pages/auth/sign-in">start writing</Link>
          </Box>
        </Box>

        <Box>
          <Text
            fontSize="1.2rem"
            fontWeight="bold"
            mb="1rem"
            mt="2.5rem"
            color={colorMode === "light" ? "#252525" : "#d0d0d0"}
          >
            You might Know
          </Text>
          {follow.map((item) => {
            return (
              <Flex
                key={item.id}
                justify="space-between"
                align={"center"}
                mb=".6rem"
              >
                <Flex gap=".5rem" align={"center"}>
                  <Image
                    src={item.src}
                    alt="a person's face"
                    style={{
                      borderRadius: "50%",
                    }}
                    height={25}
                    width={30}
                  />
                  <Box>
                    <Heading
                      fontSize=".9rem"
                      color={colorMode === "dark" ? "#edeaea" : "#111"}
                    >
                      {item.name}
                    </Heading>
                    <Text fontSize={".8rem"}>{item.title}</Text>
                  </Box>
                </Flex>

                <Flex
                  align="center"
                  py=".2rem"
                  px=".8rem"
                  border={`1px solid ${
                    colorMode === "dark" ? "rgb(255, 255, 255, .1)" : "#d0d0d0"
                  }`}
                  borderRadius="20px"
                  fontWeight={600}
                  mt="1rem"
                  w="fit-content"
                  fontSize={".8rem"}
                  color={colorMode === "dark" ? "#d0d0d0" : "#111"}
                >
                  <Link href="/pages/auth/sign-in">Follow</Link>
                </Flex>
              </Flex>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default SideNav;
