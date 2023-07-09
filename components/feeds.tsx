import React, { use, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  useColorMode,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import { VscBook } from "react-icons/vsc";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Loader from "./utils/spinner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/auth";
import { useComments, useToggleLike } from "../hooks/likes-comments";
import Link from "next/link";
import AuthorData from "./author-data";
import { capitalizeName } from "./utils/functions";

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
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [loading, setLoading] = useState<boolean>(false);
  const [authorData, setAuthorData] = useState<any>(null);
  const { user, isLoading } = useAuth();
  const isLiked = post?.data?.likes?.includes(user?.email);
  const config = { email: user?.email, isLiked, id: post?.id };
  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  const { comments } = useComments(post?.id);
  console.log(isLiked, "isLiked");

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

  const capitalizedName = capitalizeName(authorData?.name);

  return (
    <Box
      color={colorMode === "dark" ? "#aeadad" : "#626262"}
      border={border}
      borderBottom={borderBottom}
      borderRadius={borderRadius}
      mb=".5rem"
    >
      <AuthorData
        size="md"
        href={`/profile/${authorData?.email}`}
        px={px}
        name={capitalizedName}
        src={authorData?.imageUrl}
        occupation={authorData?.occupation}
      />

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
                  height: isMobile ? "13rem" : "9rem",
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
          <Flex cursor="pointer" align={"center"}>
            <IconButton
              onClick={toggleLike}
              isLoading={likeLoading || isLoading}
              icon={isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
              color={isLiked ? "red" : undefined}
              variant={"ghost"}
              aria-label={"like"}
            />
            <Text fontSize={".95rem"}>{post?.data?.likes?.length} </Text>
          </Flex>
          <Link href={href}>
            <Flex align={"center"} gap=".5rem" cursor="pointer">
              <Icon
                as={BsChatDots}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />
              <Text fontSize={".8rem"}>{comments?.length}</Text>
            </Flex>
          </Link>
        </Flex>
      )}

      <hr />
    </Box>
  );
};

export default Feeds;
