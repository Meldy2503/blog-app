"use client";

import React from "react";
import Sidebar from "../../../../components/sidebar";
import { Box, Heading, Text, useColorMode, Flex, Icon } from "@chakra-ui/react";
import Feeds from "../../../../components/feeds";
import { useAuth } from "../../../../hooks/auth";
import { useDrafts } from "../../../../hooks/bookmark-drafts";
import Loader from "../../../../components/utils/spinner";
import { FaPencilAlt } from "react-icons/fa";
import { ImFilesEmpty } from "react-icons/im";
import Button from "../../../../components/button";
import ProtectedRoute from "../../../../components/protected-routes";

const Drafts = () => {
  const { colorMode } = useColorMode();
  const { user } = useAuth();
  const { userDrafts, isLoading } = useDrafts(user?.email);

  return (
    // <ProtectedRoute>
    <Sidebar>
      <Box
        bg={colorMode === "light" ? "#f7f6f6" : "#171923"}
        px={{ base: "1rem", md: "2rem" }}
        py="1rem"
        color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
      >
        <Box w={{ base: "100%", lg: "90%", xl: "75%" }} m="auto" pt="2rem">
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
                DRAFTS{" "}
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
            {isLoading ? (
              <Loader />
            ) : userDrafts?.length ? (
              userDrafts?.map((post: any) => (
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
                    href={`/dashboard/${post?.id}`}
                  />
                </Box>
              ))
            ) : userDrafts?.length === 0 ? (
              <Flex
                mt="8rem"
                mb="14rem"
                align={"center"}
                justify={"center"}
                direction={"column"}
                gap="2rem"
              >
                <Icon as={ImFilesEmpty} boxSize={36} />
                <Text>You have no Drafteded Posts yet</Text>
              </Flex>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Sidebar>
    // </ProtectedRoute>
  );
};

export default Drafts;
