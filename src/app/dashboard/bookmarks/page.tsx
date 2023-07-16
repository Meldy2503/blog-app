"use client";

import React from "react";
import Sidebar from "../../../../components/sidebar";
import {
  Box,
  Center,
  Heading,
  Text,
  useColorMode,
  Flex,
  Icon,
  Tabs,
} from "@chakra-ui/react";
import { usePosts } from "../../../../hooks/posts";
import Feeds from "../../../../components/feeds";
import { useAuth } from "../../../../hooks/auth";
import { useBookmarkedPosts } from "../../../../hooks/bookmark";
import Loader from "../../../../components/utils/spinner";
import { FaPencilAlt } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import Button from "../../../../components/button";

const BookMarks = () => {
  const { colorMode } = useColorMode();
  const { user, isLoading: userLoading } = useAuth();
  const { posts } = usePosts();

  const { userBookmarks, isLoading: userBookmarksLoading } = useBookmarkedPosts(
    user?.email
  );

  // to get bookmarked post id
  const bookmarkedPostIds = userBookmarks?.map((post) => post?.postId);
  // compare the bookmarked post id to all posts id
  const bookmarkedPostsData = posts?.filter((post) =>
    bookmarkedPostIds?.includes(post?.id)
  );

  if (userBookmarksLoading || userLoading) {
    return <Loader />;
  }

  return (
    <Sidebar>
      <Box
        bg={colorMode === "light" ? "#f7f6f6" : "#171923"}
        px={{ base: "1rem", md: "2rem" }}
        py="1rem"
        color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
      >
        <Box w={{ base: "100%", lg: "80%" }} m="auto" pt="2rem">
          <Flex
            justify={"space-between"}
            mb="2.5rem"
            gap={{ base: "1.5rem", sm: "0rem" }}
            align={{ base: "start", sm: "center" }}
          >
            <Box>
              <Heading
                as={"h5"}
                fontSize={{ base: "1.5rem", md: "1.7rem" }}
                fontWeight={600}
                color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
                mb={".5rem"}
              >
                BOOKMARKS{" "}
              </Heading>
              <Text color={colorMode === "dark" ? "#d0d0d0" : "#626262"}>
                Explore Your Personal Library{" "}
              </Text>
            </Box>
            <Button
              href="/dashboard/write-post"
              bg="#543EE0"
              color="#fff"
              w="6.5rem"
            >
              <Icon as={FaPencilAlt} color="#fff" mr=".5rem" />
              Write
            </Button>
          </Flex>

          <Box>
            {bookmarkedPostsData?.length ? (
              bookmarkedPostsData?.map((post: any) => (
                <Box key={post?.id}>
                  <Feeds
                    post={post}
                    borderRadius={"6px"}
                    border={`1px solid ${
                      colorMode === "dark"
                        ? "rgb(255, 255, 255, .2)"
                        : "#d0d0d0"
                    }`}
                    px={{ base: "1rem", xl: "1.5rem" }}
                    href={`/dashboard/${post.id}`}
                  />
                </Box>
              ))
            ) : (
              <Flex
                mt="8rem"
                mb="14rem"
                align={"center"}
                justify={"center"}
                direction={"column"}
                gap="2rem"
              >
                <Icon as={ImFilesEmpty} boxSize={36} />
                <Text>You have no Bookmarked Posts yet</Text>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default BookMarks;
