"use client";

import { useParams } from "next/navigation";
import React from "react";
import Feeds from "../../../../../components/feeds";
import { usePostCategory } from "../../../../../hooks/posts";
import { Box, Heading, Text, useColorMode } from "@chakra-ui/react";
import Sidebar from "../../../../../components/sidebar";
import ProtectedRoute from "../../../../../components/protected-routes";

const DashboardCategory = () => {
  const { id } = useParams();
  const { postCategory } = usePostCategory(id);
  const { colorMode } = useColorMode();

  return (
    // <ProtectedRoute>
    <Sidebar>
      <Box bg={colorMode === "light" ? "#f7f6f6" : "#171923"} py="3rem">
        {postCategory?.map((post, index) => (
          <Box key={index} w={{ base: "95%", lg: "90%", xl: "70%" }} m="auto">
            {index === 0 && (
              <>
                <Heading
                  as={"h5"}
                  fontSize={{ base: "1.5rem", md: "1.6rem" }}
                  fontWeight={600}
                  color={colorMode === "dark" ? "#f5f6f6" : "#333"}
                >
                  {post?.category.toUpperCase()}
                </Heading>
                <Text
                  color={colorMode === "dark" ? "#d0d0d0" : "#626262"}
                  mb={"2rem"}
                  mt=".5rem"
                >
                  Explore different categories you’d love{" "}
                </Text>
              </>
            )}
            <Feeds
              post={post}
              borderRadius={"6px"}
              border={`1px solid ${
                colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
              }`}
              px={{ base: "1rem", xl: "1.5rem" }}
              href={`/dashboard/${post.id}`}
            />
          </Box>
        ))}
      </Box>
    </Sidebar>
    // </ProtectedRoute>
  );
};

export default DashboardCategory;
