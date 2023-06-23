"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  HStack,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import { VscBook } from "react-icons/vsc";
import { MdOutlineAnalytics } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { BlogContext, Posts } from "../../../../../context/blog-context";
import { usePathname, useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Loader from "@/app/components/spinner";

const PostId = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [post, setPost] = useState<Posts | any>([]);

  const { colorMode } = useColorMode();
  const { posts } = useContext(BlogContext);
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  useEffect(() => {
    if (posts.length === 0) {
      return;
    }
    const url = `${pathname}?${searchParams}`;
    const id = url.split("/").pop()?.replace("?", "");
    const selectedPost = posts.find((post) => post.id === id);
    setPost(selectedPost);
  }, [posts, pathname, searchParams, post]);

  if (!posts.length) {
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
        // px={{ base: "1rem", xl: "2rem" }}
        py={{ base: "1rem", lg: "2rem" }}
      >
        <Box>
          <Heading
            as={"h1"}
            fontSize={"3rem"}
            fontWeight={550}
            color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
            mb="2rem"
          >
            {post?.data?.title}
          </Heading>
          <Flex align={"center"} gap="1rem" mt="2rem">
            <Box>
              <Image
                src="/assets/face-1.jpg"
                alt="a person's face"
                style={{
                  borderRadius: "50%",
                }}
                height={60}
                width={60}
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
                  Grace Ikpang{" "}
                </Heading>
                <Box color="green">
                  <Link href="#">Follow</Link>
                </Box>
              </Flex>
              <Text>Product designer</Text>
            </Box>
          </Flex>
          <Flex align={"center"} gap="2rem" fontSize={".9rem"}>
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
          <Flex
            mt="1rem"
            flexWrap="wrap"
            gap="3rem"
            borderY={`1px solid ${
              colorMode === "dark" ? "rgb(255, 255, 255, .1)" : "#d0d0d0"
            }`}
            py="1rem"
          >
            <HStack>
              <Icon
                as={AiOutlineHeart}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />
              <Text fontSize={".9rem"}>20 likes</Text>
            </HStack>
            <HStack>
              <Icon
                as={MdOutlineAnalytics}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />
              <Text fontSize={".9rem"}>2000 views</Text>
            </HStack>
          </Flex>
          <Box mt="2rem">
            <Image
              src={post?.data?.bannerImage}
              alt="feed image"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "6px",
                margin: "auto",
                height: isMobile ? "15rem" : "25rem",
                width: isMobile ? "100%" : "80%",
                maxWidth: "100%",
              }}
              height={800}
              width={800}
            />{" "}
            <Text fontSize="1.2rem" lineHeight={1.65} mt="2rem">
              {post?.data?.body}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PostId;
