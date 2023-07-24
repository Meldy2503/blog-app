"use client";

import { useParams } from "next/navigation";
import React from "react";
import Feeds from "../../../../components/feeds";
import { capitalizeName } from "../../../../components/utils/functions";
import { usePostCategory } from "../../../../hooks/posts";
import { Box, Flex, Heading, useColorMode } from "@chakra-ui/react";
import SideNav from "../../../../components/side-nav";
import Navbar from "../../../../components/navbar";

const CategoryList = () => {
  const { id } = useParams();
  const { postCategory } = usePostCategory(id);
  const { colorMode } = useColorMode();

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
          {postCategory?.map((post, index) => (
            <Box key={index}>
              {index === 0 && (
                <Heading
                  as={"h5"}
                  mt="1rem"
                  mb="2rem"
                  textDecor={"underline"}
                  fontSize={{ base: "1.5rem", md: "1.6rem" }}
                  fontWeight={600}
                  color={colorMode === "dark" ? "#d0d0d0" : "#333"}
                >
                  {capitalizeName(post?.category)}
                </Heading>
              )}
              <Feeds post={post} href={`/feed/${post?.id}`} />
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

export default CategoryList;
