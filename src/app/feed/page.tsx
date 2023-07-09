"use client";

import React, { useContext, useState } from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { BlogContext } from "../../../context/blog-context";
import SideNav from "../../../components/side-nav";
import Navbar from "../../../components/navbar";
import Loader from "../../../components/utils/spinner";
import Feeds from "../../../components/feeds";
import { useAuth } from "../../../hooks/auth";

const Posts = () => {
  const { colorMode } = useColorMode();
  const { posts } = useContext(BlogContext);
  const { user } = useAuth();

  if (!posts.length) {
    return <Loader />;
  }

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
        <Box
          borderRight={{
            base: "none",
            md: `1px solid ${
              colorMode === "dark" ? "rgb(255, 255, 255, .1)" : "#e0dede"
            }`,
          }}
          pr={{ base: 0, md: "3rem" }}
        >
          {posts.map((post) => (
            <Box key={post.id}>
              <Feeds
                post={post}
                borderRadius="none"
                borderBottom={`1px solid ${
                  colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
                }`}
                pb={user ? "0" : "2rem"}
                href={`/feed/${post.id}`}
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
