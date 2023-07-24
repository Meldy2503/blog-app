"use client";

import React from "react";
import {
  useColorMode,
  Box,
  Text,
  Flex,
  Heading,
  useMediaQuery,
  Skeleton,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../hooks/auth";
import { follow } from "./utils/constants";
import SearchBar from "./search-bar";
import { usePosts } from "../hooks/posts";

const SideNav = ({ bg, btnBg }: any) => {
  const { colorMode } = useColorMode();
  const { user } = useAuth();
  const { posts, isLoading } = usePosts();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      bg={bg}
      color={colorMode === "dark" ? "#bdbbbb" : "#737373"}
      w={{ base: "100%", md: "35%" }}
      py="1rem"
      pr="1rem"
      pl={{ base: "1rem", md: "1.5rem" }}
      position="sticky"
      top="0px"
      h="100%"
      borderLeft={{
        base: "none",
        md: `1px solid ${
          colorMode === "dark" ? "rgb(255, 255, 255, .1)" : "#e0dede"
        }`,
      }}
    >
      {!isMobile && <SearchBar mb="1.5rem" w={{ base: "20rem", md: "100%" }} />}{" "}
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
          {Array.from(
            new Set(posts?.slice(0, 7).map((post) => post?.category))
          ).map((item) => {
            return (
              <Skeleton isLoaded={!isLoading} key={item}>
                <Box
                  bg={btnBg}
                  py=".2rem"
                  px=".9rem"
                  borderRadius="20px"
                  fontSize=".9rem"
                >
                  <Link href={`/categories/${item}`}>{item}</Link>
                </Box>
              </Skeleton>
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
            <Link href={user ? "/dashboard/write-post" : "/auth/sign-in"}>
              start writing
            </Link>
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
                  <Link href="/auth/sign-in">Follow</Link>
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
