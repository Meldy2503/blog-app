"use client";
import React, { useState } from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import Navbar from "../../../../components/navbar";
import ViewPost from "../../../../components/post-id";
import { DocumentData } from "firebase/firestore";
import { Posts } from "../../../../context/blog-context";

const FeedPostId = () => {
  const { colorMode } = useColorMode();
  const [post, setPost] = useState<Posts | any>([]);
  const [authorData, setAuthorData] = useState<DocumentData | any>(null);

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
          <ViewPost
            post={post}
            setPost={setPost}
            authorData={authorData}
            setAuthorData={setAuthorData}
          />
        </Box>
      </Box>
    </>
  );
};

export default FeedPostId;
