"use client";

import React, { useContext } from "react";
import { Box, Flex, useColorMode, useMediaQuery } from "@chakra-ui/react";
import SideNav from "../../../components/side-nav";
import Navbar from "../../../components/navbar";
import Feeds from "../../../components/feeds";
import { usePosts } from "../../../hooks/posts";
import { BlogContext } from "../../../context/blog-context";
import SearchBar from "../../../components/search-bar";

const Posts = () => {
  const { colorMode } = useColorMode();
  const { posts } = usePosts();
  const { searchResults } = useContext(BlogContext);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

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
          {isMobile && (
            <SearchBar mb="1rem" w={{ base: "20rem", md: "100%" }} />
          )}{" "}
          <>
            {searchResults.length
              ? searchResults?.map((post: any) => (
                  <Box key={post?.id}>
                    <Feeds
                      post={post}
                      borderRadius="none"
                      borderBottom={`1px solid ${
                        colorMode === "dark"
                          ? "rgb(255, 255, 255, .2)"
                          : "#d0d0d0"
                      }`}
                      href={`/feed/${post?.id}`}
                    />
                  </Box>
                ))
              : posts?.map((post: any) => (
                  <Box key={post?.id}>
                    <Feeds
                      post={post}
                      borderRadius="none"
                      borderBottom={`1px solid ${
                        colorMode === "dark"
                          ? "rgb(255, 255, 255, .2)"
                          : "#d0d0d0"
                      }`}
                      href={`/feed/${post?.id}`}
                    />
                  </Box>
                ))}
          </>
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
