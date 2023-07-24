"use client";
import React, { useState } from "react";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import Sidebar from "../../../../components/sidebar";
import ViewPost from "../../../../components/post-id";
import NewComment from "../../../../components/comments/write-comment";
import CommentList from "../../../../components/comments/comment-list";
import { usePost } from "../../../../hooks/posts";
import { useParams } from "next/navigation";
import Loader from "../../../../components/utils/spinner";

const ViewPostId = () => {
  const { slug } = useParams();
  const { colorMode } = useColorMode();
  const { singlePost: post, isLoading } = usePost(slug);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Sidebar>
      <Box
        m="auto"
        color={colorMode === "dark" ? "#b0afaf" : "#626262"}
        bg={colorMode === "light" ? "#f7f6f6" : "#171923"}
        px={{ base: "1rem", xl: "2rem" }}
        py={{ base: "1rem", lg: "2rem" }}
      >
        <Box w={{ base: "100%", lg: "70%" }} m="auto" pt="2rem">
          <ViewPost post={post} />
          <Box>
            <Heading fontSize={"1.6rem"} mt="4rem" mb="1rem">
              Comments
            </Heading>
            <NewComment post={post} />
            {post && <CommentList post={post} />}
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default ViewPostId;
