"use client";

import React, { useContext, useState } from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { BlogContext } from "../../../../context/blog-context";
import SideNav from "@/app/components/side-nav";
import Navbar from "@/app/components/navbar";
import Loader from "@/app/components/utils/spinner";
import Feeds from "@/app/components/feeds";

const Posts = () => {
  const { colorMode } = useColorMode();
  const { posts } = useContext(BlogContext);

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
            <Link href={`/pages/feed/${post.id}`} key={post.id}>
              <Feeds
                post={post}
                borderRadius="none"
                borderBottom={`1px solid ${
                  colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
                }`}
              />
            </Link>
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
