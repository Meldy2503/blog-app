import React, { useContext } from "react";
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
import Loader from "./spinner";

const ForYou = ({ post }: any) => {
  const { colorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 1280px)");

  return (
    //   <Link
    //     href={`/pages/dashboard/${post.id}`}
    //   >
    <Box
      color={colorMode === "dark" ? "#aeadad" : "#626262"}
      border={`1px solid ${
        colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
      }`}
      borderRadius={"6px"}
      mb=".5rem"
    >
      <Flex
        justify={"space-between"}
        align={"center"}
        direction={{ base: "column", xl: "row" }}
        px={{ base: "1rem", xl: "1.5rem" }}
        py={{ base: "1rem", lg: "2rem" }}
      >
        <Box w={{ base: "100%", xl: "60%" }}>
          <Flex align={"center"} gap="1rem">
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
              <Heading
                as={"h4"}
                fontSize={"1.3rem"}
                fontWeight={550}
                color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
                mb=".3rem"
              >
                Grace Ikpang{" "}
              </Heading>
              <Text>Product designer</Text>
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

          <Box mb={{ base: "1.5rem", xl: "0rem" }}>
            <Heading
              as={"h5"}
              fontSize={"1.5rem"}
              fontWeight={550}
              color={colorMode === "dark" ? "#e6e5e5" : "#111111"}
              my=".5rem"
            >
              {post.data.title}
            </Heading>
            <Text>{post.data.brief}</Text>
          </Box>
        </Box>
        <Flex w={{ base: "100%", xl: "35%" }} direction="column">
          <Image
            src={post.data.bannerImage}
            alt="feed image"
            style={{
              objectFit: "cover",
              borderRadius: "6px",
              height: isMobile ? "11rem" : "11rem",
              objectPosition: "center",
            }}
            height={500}
            width={300}
          />{" "}
          <Flex
            mt=".8rem"
            align={"center"}
            flexWrap="wrap"
            gap="2rem"
            justify={{ base: "flex-start", xl: "space-between" }}
          >
            <HStack>
              <Icon
                as={AiOutlineHeart}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />
              <Text fontSize={".8rem"}>20 likes</Text>
            </HStack>
            <HStack>
              <Icon
                as={MdOutlineAnalytics}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
              />
              <Text fontSize={".8rem"}>2000 views</Text>
            </HStack>
          </Flex>
        </Flex>
      </Flex>

      <hr />
    </Box>
    // </Link>
  );
};

export default ForYou;
