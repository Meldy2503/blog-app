"use client";

import React, { use, useEffect, useState } from "react";
import Wrapper from "@/app/components/wrapper";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import EditProfileModal from "@/app/components/edit-profile-modal";
import UserNavbar from "@/app/components/user-nav";
import SideNav from "@/app/components/side-nav";
import { useAuth } from "@/app/hooks/auth";
import Loader from "@/app/components/utils/spinner";

const Profile = () => {
  const { colorMode } = useColorMode();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const formatDate = (date: number) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const capitalizedName = user?.name?.replace(/\b\w/g, (letter: any) =>
    letter.toUpperCase()
  );

  useEffect(() => {
    setLoading(true);
  }, [user]);

  if (user === null) {
    return <Loader />;
  }

  return (
    <>
      <UserNavbar />
      <Wrapper bg={colorMode === "light" ? "#f7f6f6" : "#171923"} py="0">
        <Box
          style={{
            backgroundImage:
              "linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/assets/profile1.jpg')",
          }}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          h="40vh"
          w="100%"
        ></Box>
        <Avatar
          name={user?.name}
          size={"2xl"}
          mt={"-120px"}
          ml={{ base: "20px", sm: "40px", lg: "50px" }}
          border={"5px solid #1f222f"}
          src={user?.imageUrl}
        />

        <Center
          mt={"-63px"}
          bg={colorMode === "light" ? "white" : "#2d3748"}
          flexDir={"column"}
          textAlign={"center"}
          py={"40px"}
          gap={"10px"}
          zIndex={1}
        >
          <Flex
            justify={{ base: "flex-start", sm: "space-between" }}
            align={{ base: "flex-start", sm: "space-between" }}
            gap={{ base: "1.5rem", sm: "0" }}
            w="90%"
            direction={{ base: "column", sm: "row" }}
          >
            <Box mt="1rem" textAlign={"left"}>
              <Heading fontSize="2xl" color="#543ee0" letterSpacing={".1rem"}>
                {capitalizedName}
              </Heading>
              <Text>Joined on {formatDate(user?.joinedOn)}</Text>
            </Box>
            <EditProfileModal />
          </Flex>
        </Center>
        <Flex
          justify={{ base: "center", md: "space-between" }}
          mt="2rem"
          direction={{ base: "column", md: "row" }}
          gap="2rem"
        >
          <Box
            bg={colorMode === "light" ? "white" : "#2d3748"}
            w={{ base: "100%", md: "50%" }}
            p="2rem"
          >
            <Flex
              gap="1rem"
              w="100%"
              justify={"space-between"}
              align={"center"}
              flexWrap={"wrap"}
              m="auto"
            ></Flex>
            <Flex justify="space-between" align={"center"} mb=".6rem">
              <Flex fontSize="1rem" direction="column" gap="2rem">
                <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                  ABOUT
                </Text>
                <Flex gap="1rem">
                  <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                    Email:
                  </Text>
                  <Text fontWeight={"bold"}>{user?.email}</Text>
                </Flex>
                <Flex gap="1rem">
                  <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                    Username:
                  </Text>
                  <Text fontWeight={"bold"}>{user?.username}</Text>
                </Flex>
                <Flex gap="1rem">
                  <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                    Occupation:
                  </Text>
                  <Text fontWeight={"bold"}>{user?.occupation}</Text>
                </Flex>
                <Flex gap="1rem">
                  <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                    Posts:
                  </Text>
                  <Text fontWeight={"bold"}>0</Text>
                </Flex>
                <Flex gap="1rem">
                  <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                    Comments:
                  </Text>
                  <Text fontWeight={"bold"}>0</Text>
                </Flex>
                <Flex gap="1rem">
                  <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                    Followers:
                  </Text>
                  <Text fontWeight={"bold"}>{user?.followerCount ?? 0} </Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <SideNav
            bg={colorMode === "light" ? "white" : "#2d3748"}
            px="2rem"
            btnBg={colorMode === "dark" ? "#171923" : "#f5f4f4"}
          />
        </Flex>
      </Wrapper>
    </>
  );
};

export default Profile;
