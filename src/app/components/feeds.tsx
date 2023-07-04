import React, { useEffect, useState } from "react";
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
import { BsChatDots } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Loader from "./utils/spinner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../hooks/auth";
import { useToggleLike } from "../hooks/likes-comments";
import Link from "next/link";

export const Feeds = ({
  post,
  borderBottom,
  border,
  borderRadius,
  px,
  pb,
  href,
}: any) => {
  const { colorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 1280px)");
  const [loading, setLoading] = useState<boolean>(false);
  const [authorData, setAuthorData] = useState<any>(null);
  const { user } = useAuth();
  const isLiked = post?.data?.likes?.includes(user?.email);
  const config = { email: user?.email, isLiked, id: post?.id };
  const { toggleLike } = useToggleLike(config);

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

  if (loading) {
    return <Loader />;
  }

  const capitalizedName = authorData?.name?.replace(/\b\w/g, (letter: any) =>
    letter.toUpperCase()
  );

  return (
    <Box
      color={colorMode === "dark" ? "#aeadad" : "#626262"}
      border={border}
      borderBottom={borderBottom}
      borderRadius={borderRadius}
      mb=".5rem"
    >
      <Flex align={"center"} gap=".7rem" px={px} mt="1.5rem">
        <Box>
          <Avatar src={authorData?.imageUrl} size="md" name={capitalizedName} />
        </Box>
        <Box mt=".4rem">
          <Heading
            as={"h4"}
            fontSize={"1.1rem"}
            fontWeight={550}
            color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
          >
            {capitalizedName}
          </Heading>
          <Text>{authorData?.occupation}</Text>
        </Box>
      </Flex>
      <Link href={href}>
        <Flex
          justify={"space-between"}
          align={"center"}
          direction={{ base: "column", sm: "row" }}
          px={px}
          pb={pb}
          gap="2rem"
        >
          <Box w={{ base: "100%", md: "67%", xl: "60%" }}>
            <Flex
              align={"center"}
              fontSize={".9rem"}
              mt=".5rem"
              flexWrap="wrap"
            >
              <Flex align={"center"} gap=".5rem" my=".5rem" mr="1.5rem">
                <Icon
                  as={VscBook}
                  color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
                />

                <Text>{post?.data?.postLength} mins read</Text>
              </Flex>
              <Text mr="1.5rem">
                {new Date(post?.data?.postedOn).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Text>
              <Box
                bg={colorMode === "dark" ? "#2d3748" : "#d0d0d0"}
                py=".1rem"
                px=".5rem"
                borderRadius="20px"
                mr="1.5rem"
              >
                <Text>{post?.data?.category}</Text>
              </Box>
            </Flex>

            <Box mb={{ base: ".5rem", sm: "0rem" }}>
              <Heading
                as={"h5"}
                fontSize={"1.2rem"}
                fontWeight={550}
                color={colorMode === "dark" ? "#e6e5e5" : "#111111"}
                my=".5rem"
              >
                {post?.data?.title}
              </Heading>
              <Text>{post?.data?.brief}</Text>
            </Box>
          </Box>
          <Box w={{ base: "100%", sm: "14rem" }}>
            {post?.data?.bannerImage && (
              <Image
                src={post?.data?.bannerImage}
                alt="feed image"
                style={{
                  objectFit: "cover",
                  height: isMobile ? "100%" : "9rem",
                  objectPosition: "center",
                }}
                height={500}
                width={500}
              />
            )}
          </Box>
        </Flex>
      </Link>
      {user && (
        <Flex
          align={"center"}
          flexWrap="wrap"
          gap={{ base: "1rem", sm: "2.5rem" }}
          px={px}
          py="1rem"
          justify={{ base: "space-between", sm: "flex-end" }}
        >
          <Flex
            onClick={toggleLike}
            gap=".5rem"
            cursor="pointer"
            align={"center"}
          >
            <Icon
              as={isLiked ? AiFillHeart : AiOutlineHeart}
              color={isLiked ? "red" : undefined}
            />
            <Text fontSize={".95rem"}>{post?.data?.likes?.length} </Text>
          </Flex>
          <Flex align={"center"} gap=".5rem" cursor="pointer">
            <Icon
              as={BsChatDots}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            />
            <Text fontSize={".8rem"}>20</Text>
          </Flex>
        </Flex>
      )}

      <hr />
    </Box>
  );
};

export default Feeds;
