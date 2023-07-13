import React from "react";
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
import Loader from "./utils/spinner";
import Link from "next/link";
import AuthorData from "./author-data";
import { capitalizeName, formatDate } from "./utils/functions";
import PostActions from "./post-actions";
import { useUsers } from "../hooks/users";

export const Feeds = ({
  post,
  borderBottom,
  border,
  borderRadius,
  px,
  href,
}: any) => {
  const { colorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const { users, isLoading } = useUsers(post?.author);

  if (isLoading) {
    return <Loader />;
  }

  const capitalizedName = capitalizeName(users?.name);

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
        href={`/profile/${users?.email}`}
        px={px}
        name={capitalizedName}
        src={users?.imageUrl}
        occupation={users?.occupation}
      />

      <Link href={href}>
        <Flex
          justify={"space-between"}
          align={"center"}
          direction={{ base: "column", sm: "row" }}
          px={px}
          pb=".1rem"
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

                <Text>{post?.postLength} mins read</Text>
              </Flex>
              <Text mr="1.5rem">{formatDate(post?.postedOn)}</Text>
              <Box
                bg={colorMode === "dark" ? "#2d3748" : "#d0d0d0"}
                py=".1rem"
                px=".5rem"
                borderRadius="20px"
                mr="1.5rem"
              >
                <Text>{post?.category}</Text>
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
                {post?.title}
              </Heading>
              <Text>{post?.brief}</Text>
            </Box>
          </Box>
          <Box w={{ base: "100%", sm: "14rem" }}>
            {post?.bannerImage && (
              <Image
                src={post?.bannerImage}
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
      <Box mb="1rem">
        <PostActions post={post} />
      </Box>

      <hr />
    </Box>
  );
};

export default Feeds;
