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
  Avatar,
} from "@chakra-ui/react";
import Image from "next/image";
import { VscBook } from "react-icons/vsc";
import Link from "next/link";
import { BlogContext, Posts } from "../../../../../context/blog-context";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "@/app/components/utils/spinner";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../../../../../firebase";
import Navbar from "@/app/components/navbar";
import MarkdownIt from "markdown-it";

const PostId = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [post, setPost] = useState<Posts | any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [authorData, setAuthorData] = useState<DocumentData | any>(null);
  const { entry } = useContext(BlogContext);

  const { colorMode } = useColorMode();
  const { posts } = useContext(BlogContext);
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const capitalizedName = authorData?.name?.replace(/\b\w/g, (letter: any) =>
    letter.toUpperCase()
  );

  // function calculateReadTime(content: string) {
  //   const wordCount = content.trim().split(/\s+/).length;
  //   const averageReadingSpeed = 50;
  //   const readTime = Math.ceil(wordCount / averageReadingSpeed);
  //   return readTime;
  // }

  function renderMarkdownToHtml(markdownText: string): React.ReactNode {
    const md = new MarkdownIt();
    const html = md.render(markdownText);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

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
  }, [post?.data?.author]);

  useEffect(() => {
    if (posts.length === 0) {
      return;
    }

    const url = `${pathname}?${searchParams}`;
    const id = url.split("/").pop()?.replace("?", "");
    const selectedPost = posts.find((post) => post.id === id);
    setPost(selectedPost);
  }, [posts, pathname, searchParams, post]);

  if (!posts.length || authorData === null) {
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
        <Box>
          <Heading
            as={"h1"}
            fontSize={{ base: "2rem", md: "2.5rem", lg: "3rem" }}
            fontWeight={550}
            color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
            mb="2rem"
          >
            {post?.data?.title}
          </Heading>
          <Flex align={"center"} gap="1rem" mt="2rem">
            <Box>
              <Avatar
                size="lg"
                src={authorData?.imageUrl}
                name={capitalizedName}
              />
            </Box>
            <Box>
              <Flex gap="1rem" align="center">
                <Heading
                  as={"h4"}
                  fontSize={"1.25rem"}
                  fontWeight={550}
                  color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
                  mb=".2rem"
                >
                  {capitalizedName}
                </Heading>
                <Box color="green">
                  <Link href="#">Follow</Link>
                </Box>
              </Flex>
              <Text>{authorData?.occupation}</Text>
            </Box>
          </Flex>
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
            <Text>
              {new Date(post?.data?.postedOn).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </Flex>
          <Box mt="2rem">
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
            {/* <Text fontSize="1.2rem" lineHeight={1.65} mt="2rem">
              {post?.data?.body}
            </Text> */}
            <Box>{renderMarkdownToHtml(entry?.body)}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PostId;
