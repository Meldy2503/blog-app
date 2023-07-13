"use client";
import React, { useState } from "react";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import Navbar from "../../../../components/navbar";
import ViewPost from "../../../../components/post-id";
import { Posts } from "../../../../context/blog-context";
import CommentList from "../../../../components/comments/comment-list";
import NewComment from "../../../../components/comments/write-comment";
import { useAuth } from "../../../../hooks/auth";

const FeedPostId = () => {
  const { colorMode } = useColorMode();
  const [post, setPost] = useState<Posts | any>([]);
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Box
        maxW="1100px"
        w={{ base: "95%", md: "75%", xl: "60%" }}
        m="auto"
        color={colorMode === "dark" ? "#b0afaf" : "#626262"}
        py={{ base: "1rem", lg: "2rem" }}
      >
        <Box>
          <ViewPost post={post} setPost={setPost} />
          <Box>
            <Heading fontSize={"1.6rem"} mt="4rem" mb="1rem">
              Comments
            </Heading>
            {user && <NewComment post={post} />}
            {post && <CommentList post={post} />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FeedPostId;
