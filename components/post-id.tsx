"use client";
import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import { VscBook } from "react-icons/vsc";
import AuthorData from "./author-data";
import { capitalizeName, formatDate } from "./utils/functions";
import Loader from "./utils/spinner";
import { MarkdownRenderer } from "./markdown-styles";
import { useUsers } from "../hooks/users";

const ViewPost = ({ post }: any) => {
  const { colorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const { users, isLoading: userLoading } = useUsers(post?.author);
  const capitalizedName = capitalizeName(users?.name);

  if (userLoading) {
    return <Loader />;
  }

  return (
    <Box color={colorMode === "dark" ? "#d0d0d0" : "#333"}>
      <Heading
        as={"h1"}
        fontSize={{ base: "2rem", md: "2.5rem", lg: "3rem" }}
        fontWeight={550}
        color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
        mb="2rem"
      >
        {post?.title}
      </Heading>

      <AuthorData
        size="lg"
        href={`/profile/${users?.email}`}
        name={capitalizedName}
        src={users?.imageUrl}
        occupation={users?.occupation}
      />

      <Flex
        align={"center"}
        gap="2rem"
        fontSize={".9rem"}
        borderY={`1px solid ${
          colorMode === "dark" ? "rgb(255, 255, 255, .1)" : "#d0d0d0"
        }`}
        mt="2rem"
        mb="3rem"
      >
        <Flex align={"center"} gap=".5rem" my="1rem">
          <Icon
            as={VscBook}
            color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
          />

          <Text>{post?.postLength} mins read</Text>
        </Flex>
        <Text>{formatDate(post?.postedOn)}</Text>
      </Flex>
      <Box my="2rem">
        {post?.bannerImage && (
          <Image
            src={post?.bannerImage}
            alt="feed image"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              margin: "auto",
              height: isMobile ? "200px" : "450px",
              width: isMobile ? "100%" : "80%",
              maxWidth: "100%",
            }}
            height={800}
            width={300}
          />
        )}
      </Box>
      <MarkdownRenderer markdownContent={post?.body} />
    </Box>
  );
};

export default ViewPost;
