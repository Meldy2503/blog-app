"use client";

import React from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import SideNav from "../../../components/side-nav";
import Navbar from "../../../components/navbar";
import Feeds from "../../../components/feeds";
import { usePosts } from "../../../hooks/posts";

const Posts = () => {
  const { colorMode } = useColorMode();
  const { posts } = usePosts();

  return (
    <>
      <Navbar />
      <Flex
        maxW="1100px"
        m="auto"
        w={{ base: "95%", md: "90%" }}
        py="2rem"
        direction={{ base: "column", md: "row" }}
        justify={"space-between"}
      >
        <Box pr={{ base: 0, md: "3rem" }} w={{ base: "100%", md: "65%" }}>
          {posts?.map((post) => (
            <Box key={post?.id}>
              <Feeds
                post={post}
                borderRadius="none"
                borderBottom={`1px solid ${
                  colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
                }`}
                href={`/feed/${post?.id}`}
              />
            </Box>
          ))}
        </Box>
        <SideNav
          bg={colorMode === "light" ? "light" : "dark"}
          btnBg={colorMode === "dark" ? "#2d3748" : "#f5f4f4"}
        />
      </Flex>
    </>
  );
};

export default Posts;
