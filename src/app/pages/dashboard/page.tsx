"use client";

import React, { useContext } from "react";
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
} from "@chakra-ui/react";
import Button from "../../components/button";
import { FaPencilAlt } from "react-icons/fa";
import ForYou from "@/app/components/for-you";
import { BlogContext } from "../../../../context/blog-context";
import Link from "next/link";
import Loader from "@/app/components/spinner";

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const { posts } = useContext(BlogContext);

  if (!posts.length) {
    return <Loader />;
  }

  return (
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
          <Button href="#" bg="#543EE0" color="#fff">
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
              For you
            </Tab>
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
              {posts.map((post) => (
                <Link href={`/pages/dashboard/${post.id}`} key={post.id}>
                  <ForYou post={post} />
                </Link>
              ))}
            </TabPanel>
            <TabPanel>
              <p>Featured</p>
            </TabPanel>
            <TabPanel>
              <p>Recent</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Dashboard;
