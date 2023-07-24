"use client";
import React from "react";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import Navbar from "../../../../components/navbar";
import ViewPost from "../../../../components/post-id";
import CommentList from "../../../../components/comments/comment-list";
import NewComment from "../../../../components/comments/write-comment";
import { useAuth } from "../../../../hooks/auth";
import { usePost } from "../../../../hooks/posts";
import Loader from "../../../../components/utils/spinner";
import { useParams } from "next/navigation";

const FeedPostId = () => {
  const { colorMode } = useColorMode();
  const { slug } = useParams();
  const { singlePost: post, isLoading } = usePost(slug);
  const { user } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

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
        <Box mt="3rem">
          <ViewPost post={post} />
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
