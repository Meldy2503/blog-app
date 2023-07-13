"use client";

import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import Button from "../../../components/button";
import { FaPencilAlt } from "react-icons/fa";
import Feeds from "../../../components/feeds";
import Sidebar from "../../../components/sidebar";
import { useAuth } from "../../../hooks/auth";
import { usePosts, usePostsUid } from "../../../hooks/posts";
import Loader from "../../../components/utils/spinner";

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const { user } = useAuth();
  const { posts, isLoading: postsLoading } = usePosts();
  const { userPosts, isLoading: userLoading } = usePostsUid(user?.email);

  // to get recent featured posts
  const sortedPosts = posts?.sort((a, b) => b?.postedOn - a?.postedOn);

  if (postsLoading || userLoading) {
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
                FEED{" "}
              </Heading>
              <Text color={colorMode === "dark" ? "#d0d0d0" : "#626262"}>
                Explore different contents you’d love{" "}
              </Text>
            </Box>
            <Button href="/dashboard/write-post" bg="#543EE0" color="#fff">
              <Icon as={FaPencilAlt} color="#fff" mr=".5rem" />
              Write
            </Button>
          </Flex>
          <Tabs position="relative" variant="unstyled">
            <TabList
              border={`1px solid ${
                colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
              }`}
              py=".5rem"
              borderRadius={".5rem"}
              display={"flex"}
              justifyContent={"space-between"}
              px={{ base: "0rem", md: "1rem" }}
            >
              <Tab
                color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
                fontSize={{ base: "1rem", md: "1.1rem" }}
                fontWeight={600}
              >
                Featured
              </Tab>
              <Tab
                color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
                fontSize={{ base: "1rem", md: "1.1rem" }}
                fontWeight={600}
              >
                My posts
              </Tab>
              <Tab
                color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
                fontSize={{ base: "1rem", md: "1.1rem" }}
                fontWeight={600}
              >
                Recent
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2.5px"
              bg="#543EE0"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel p="0">
                {posts?.map((post) => (
                  <Box key={post.id}>
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
                ))}
              </TabPanel>
              <TabPanel p="0">
                {userPosts?.length ? (
                  userPosts?.map((post) => (
                    <Box key={post.id}>
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
                  <Center>
                    <Text pb="20rem" pt="10rem">
                      You have no published posts yet
                    </Text>
                  </Center>
                )}
              </TabPanel>

              <TabPanel p="0">
                {sortedPosts?.slice(0, 5).map((post) => (
                  <Box key={post.id}>
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
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default Dashboard;
