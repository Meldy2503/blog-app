import React, { useEffect, useState } from "react";
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
import Loader from "./utils/spinner";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../../../firebase";

const Feeds = ({ post, borderBottom, border, borderRadius, px }: any) => {
  const { colorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 1280px)");
  const [authorData, setAuthorData] = useState<DocumentData | any>(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const docRef = doc(db, "users", post?.data?.author);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const authorProfile = docSnap.data();
          setAuthorData(authorProfile);
        } else {
          return;
        }
      } catch (error) {
        return;
      }
    };

    fetchAuthorData();
  }, [post?.data?.author]);

  if (post.length === 0) {
    return <Loader />;
  }

  return (
    <Box
      color={colorMode === "dark" ? "#aeadad" : "#626262"}
      border={border}
      borderBottom={borderBottom}
      borderRadius={borderRadius}
      mb=".5rem"
    >
      <Flex
        justify={"space-between"}
        align={"center"}
        direction={{ base: "column", sm: "row" }}
        px={px}
        py={{ base: "1rem", lg: "2rem" }}
        gap="2rem"
      >
        <Box w={{ base: "100%", md: "67%", xl: "60%" }}>
          <Flex align={"center"} gap=".7rem">
            <Box>
              <Image
                src={authorData?.imageUrl}
                alt="a person's face"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "50px",
                  height: "50px",
                }}
                height={200}
                width={200}
              />
            </Box>
            <Box>
              <Heading
                as={"h4"}
                fontSize={"1.2rem"}
                fontWeight={550}
                color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
                mb=".3rem"
              >
                {authorData?.firstName} {authorData?.lastName}
              </Heading>
              <Text>{authorData?.occupation}</Text>
            </Box>
          </Flex>
          <Flex align={"center"} fontSize={".9rem"} mt=".5rem" flexWrap="wrap">
            <Flex align={"center"} gap=".5rem" my=".5rem" mr="1.5rem">
              <Icon
                as={VscBook}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />

              <Text>{post.data.postLength} mins read</Text>
            </Flex>
            <Text mr="1.5rem">
              {new Date(post.data.postedOn).toLocaleString("en-US", {
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
              <Text>{post.data.category}</Text>
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
              {post.data.title}
            </Heading>
            <Text>{post.data.brief}</Text>
          </Box>
        </Box>
        <Flex w={{ base: "100%", sm: "28%", xl: "30%" }} direction="column">
          <Image
            src={post.data.bannerImage}
            alt="feed image"
            style={{
              objectFit: "cover",
              height: isMobile ? "100%" : "10rem",
              objectPosition: "center",
            }}
            height={500}
            width={500}
          />{" "}
          <Flex
            mt=".8rem"
            align={"center"}
            flexWrap="wrap"
            gap=".3rem"
            justify="space-between"
          >
            <HStack>
              <Icon
                as={AiOutlineHeart}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />
              <Text fontSize={".8rem"} lineHeight={"15px"}>
                20 likes
              </Text>
            </HStack>
            <HStack>
              <Icon
                as={MdOutlineAnalytics}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />
              <Text fontSize={".8rem"} lineHeight={"15px"}>
                2000 views
              </Text>
            </HStack>
          </Flex>
        </Flex>
      </Flex>

      <hr />
    </Box>
  );
};

export default Feeds;
