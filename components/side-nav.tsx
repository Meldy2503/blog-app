"use client";

import React from "react";
import {
  useColorMode,
  Box,
  Text,
  Flex,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../hooks/auth";
import SearchBar from "./search-bar";
import { usePosts } from "../hooks/posts";
import { ListHoriSkeleton, RecentPostsSkeleton } from "./utils/skeleton";

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
          {isLoading && <ListHoriSkeleton />}

          {Array.from(
            new Set(posts?.slice(0, 7).map((post) => post?.category))
          ).map((item) => {
            return (
              <Box
                key={item}
                bg={btnBg}
                py=".2rem"
                px=".9rem"
                borderRadius="20px"
                fontSize=".9rem"
              >
                <Link href={`/categories/${item}`}>{item}</Link>
              </Box>
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
            Explore our Recent Posts
          </Text>
          {isLoading && <RecentPostsSkeleton />}
          {posts?.slice(0, 3).map((post) => {
            return (
              <Box
                key={post?.id}
                mb=".6rem"
                p="1rem"
                borderRadius={"6px"}
                border={`1px solid ${
                  colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
                }`}
              >
                <Link href={`/feed/${post?.id}`}>
                  <Heading
                    fontSize="1rem"
                    color={colorMode === "dark" ? "#edeaea" : "#111"}
                    mb=".5rem"
                  >
                    {post?.title}
                  </Heading>
                  <Text fontSize={".95rem"}>{post?.brief}</Text>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default SideNav;
