"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { usePathname, useSearchParams } from "next/navigation";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import MarkdownIt from "markdown-it";
import { BlogContext, Posts } from "../context/blog-context";
import { db } from "../firebase";
import AuthorData from "./author-data";
import { capitalizeName, formatDate } from "./utils/functions";
import Loader from "./utils/spinner";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { MarkdownRenderer } from "./markdown-styles";

interface Props {
  post: Posts;
  setPost: React.Dispatch<React.SetStateAction<Posts | any>>;
  authorData: DocumentData | any;
  setAuthorData: React.Dispatch<React.SetStateAction<DocumentData | any>>;
}

const ViewPost = ({ post, setPost, authorData, setAuthorData }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { entry } = useContext(BlogContext);

  const { colorMode } = useColorMode();
  const { posts } = useContext(BlogContext);
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const capitalizedName = capitalizeName(authorData?.name);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);

        const docRef = doc(db, "users", post?.data?.author);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const authorProfile = docSnap.data();
          setAuthorData(authorProfile);
          setLoading(false);
        } else {
          return;
        }
      } catch (error) {
        setLoading(false);

        return;
      }
    };

    fetchAuthorData();
  }, [post?.data?.author, setAuthorData]);

  useEffect(() => {
    if (posts.length === 0) {
      return;
    }

    const url = `${pathname}?${searchParams}`;
    const id = url.split("/").pop()?.replace("?", "");
    const selectedPost = posts.find((post) => post.id === id);
    setPost(selectedPost);
  }, [posts, post, pathname, searchParams, setPost]);

  if (!posts || !authorData) {
    return <Loader />;
  }

  return (
    <>
      <Heading
        as={"h1"}
        fontSize={{ base: "2rem", md: "2.5rem", lg: "3rem" }}
        fontWeight={550}
        color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
        mb="2rem"
      >
        {post?.data?.title}
      </Heading>

      <AuthorData
        size="lg"
        href={`/profile/${authorData?.email}`}
        name={capitalizedName}
        src={authorData?.imageUrl}
        occupation={authorData?.occupation}
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

          <Text>{post?.data?.postLength} mins read</Text>
        </Flex>
        <Text>{formatDate(post?.data?.postedOn)}</Text>
      </Flex>
      <Box my="2rem">
        {post?.data?.bannerImage && (
          <Image
            src={post?.data?.bannerImage}
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
      <MarkdownRenderer markdownContent={post?.data?.body} />
    </>
  );
};

export default ViewPost;
