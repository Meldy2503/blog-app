"use client";
import React, { useState } from "react";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import Sidebar from "../../../../app/components/sidebar";
import ViewPost from "@/app/components/post-id";
import NewComment from "@/app/components/comments/write-comment";
import { Posts } from "../../../../../context/blog-context";
import { DocumentData } from "firebase/firestore";
import CommentList from "@/app/components/comments/comment-list";

const ViewPostId = () => {
  const { colorMode } = useColorMode();
  const [post, setPost] = useState<Posts | any>([]);
  const [authorData, setAuthorData] = useState<DocumentData | any>(null);

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
          <ViewPost
            post={post}
            setPost={setPost}
            authorData={authorData}
            setAuthorData={setAuthorData}
          />
          <Box>
            <Heading fontSize={"1.6rem"} mt="4rem" mb="1rem">
              Comments
            </Heading>
            <NewComment post={post} />
            {/* <CommentList post={post} /> */}
            {post && <CommentList post={post} />}
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default ViewPostId;
