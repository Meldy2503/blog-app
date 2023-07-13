"use client";

import React from "react";
import Wrapper from "../../../../components/wrapper";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import EditProfileModal from "../../../../components/edit-profile-modal";
import Navbar from "../../../../components/navbar";
import { useAuth } from "../../../../hooks/auth";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { formatDate } from "../../../../components/utils/functions";
import Feeds from "../../../../components/feeds";
import {
  capitalizeName,
  handleGoBack,
} from "../../../../components/utils/functions";
import { usePostsUid } from "../../../../hooks/posts";
import { useUsers } from "../../../../hooks/users";
import Loader from "../../../../components/utils/spinner";

const AllProfile = () => {
  const { colorMode } = useColorMode();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const url = `${pathname}?${searchParams}`;
  const email = url.split("/").pop()?.replace("?", "");
  const { users, isLoading: usersLoading } = useUsers(email);
  const { userPosts, isLoading: userPostLoading } = usePostsUid(email);
  const router = useRouter();

  console.log(userPosts, "userPosts");
  console.log(users, "users");
  const capitalizedName = capitalizeName(users?.name);

  const userProfilePosts = userPosts?.map((post) => (
    <Box key={post.id}>
      <Feeds
        post={post}
        px={{ base: "1rem", xl: "1.5rem" }}
        href={user ? `/dashboard/${post.id}` : `/feed/${post.id}`}
        pb={user ? "0" : "3.5rem"}
        borderBottom={`1px solid ${
          colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
        }`}
      />
    </Box>
  ));

  if (userPostLoading || usersLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Wrapper
        bg={colorMode === "light" ? "#f7f6f6" : "#171923"}
        color={colorMode === "light" ? "#111" : "#d0d0d0"}
        py="0"
      >
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
          name={users?.name}
          size={"2xl"}
          mt={"-120px"}
          ml={{ base: "20px", sm: "40px", lg: "50px" }}
          border={"5px solid #1f222f"}
          src={users?.imageUrl}
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
              <Text>
                Joined on {formatDate(users?.joinedOn || users?.date)}
              </Text>
            </Box>
            <Flex gap={"1.5rem"}>
              {user?.email === users?.email && <EditProfileModal />}
              <Button onClick={() => handleGoBack(router)}>Go Back</Button>
            </Flex>
          </Flex>
        </Center>
        <Flex
          justify={{ base: "center", md: "space-between" }}
          mt="2rem"
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "0", lg: "2rem" }}
          overflow={"auto"}
        >
          <Box
            bg={colorMode === "light" ? "white" : "#2d3748"}
            w={{ base: "100%", lg: "22rem" }}
            p="2rem"
            mb="2rem"
            h={{ base: "fit-content", lg: "100vh" }}
            overflow={"auto"}
            className="side-nav"
          >
            <Flex fontSize="1rem" direction="column" gap="2rem">
              <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                ABOUT
              </Text>
              <Box gap="1.2rem">
                <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                  Email:
                </Text>
                <Text fontWeight={"bold"}>{users?.email}</Text>
              </Box>
              <Box gap="1.2rem">
                <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                  Username:
                </Text>
                <Text fontWeight={"bold"}>{users?.username || "N/A"}</Text>
              </Box>
              <Box gap="1.2rem">
                <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                  Occupation:
                </Text>
                <Text fontWeight={"bold"}>{users?.occupation || "N/A"}</Text>
              </Box>
              <Box gap="1.2rem">
                <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                  Posts:
                </Text>
                <Text fontWeight={"bold"}>{userPosts?.length || 0}</Text>
              </Box>
              <Box gap="1.2rem">
                <Text color={colorMode === "dark" ? "#edeaea" : "#111"}>
                  Followers:
                </Text>
                <Text fontWeight={"bold"}>{users?.followerCount ?? 0} </Text>
              </Box>
            </Flex>
          </Box>

          <Box
            h="100vh"
            overflow={"auto"}
            className="side-nav"
            bg={colorMode === "light" ? "white" : "#2d3748"}
            w={{ base: "100%", lg: "70%" }}
            mb="2rem"
          >
            {userPosts?.length ? (
              userProfilePosts
            ) : (
              <Center mt="10rem">No published posts yet</Center>
            )}
          </Box>
        </Flex>
      </Wrapper>
    </>
  );
};

export default AllProfile;
