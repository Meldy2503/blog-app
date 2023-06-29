"use client";

import Wrapper from "@/app/components/wrapper";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineArticle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import EditProfileModal from "@/app/components/edit-profile-modal";
import React from "react";
import { Modal } from "@chakra-ui/react";
import Link from "next/link";
import UserNavbar from "@/app/components/user-nav";

const Profile = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   const handleGoBack = () => {
  //     router.back();
  //   };

  return (
    <Box>
      <UserNavbar />
      <Box
        bgImage="/assets/profile1.jpg"
        // bgImage="/assets/bgLeft.png"
        bgPosition="center"
        bgRepeat="no-repeat"
        // bgRepeat="repeat"
        // bgSize="contain"
        bgSize="cover"
        h="60vh"
        w="100vw"
      >
        <Box bgGradient="linear(to-l,rgb(0,0,0, 0.4),rgb(0,0,0, 0.4))" h="100%">
          <Wrapper>
            <Center
              mt={"200px"}
              bg={colorMode === "light" ? "white" : "#262f41"}
              borderRadius={"lg"}
              flexDir={"column"}
              textAlign={"center"}
              shadow={"lg"}
              py={"40px"}
              gap={"10px"}
              zIndex={1}
            >
              <Flex justify={"space-between"} w="90%" align={"center"}>
                <Flex gap="1rem" w="32%">
                  <Flex
                    align={"center"}
                    justify={"center"}
                    direction={"column"}
                    borderRadius="50%"
                    h="6rem"
                    w="6rem"
                    bg={colorMode === "dark" ? "#1f222f" : "#f6f5f5"}
                  >
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      {" "}
                      0{" "}
                    </Text>
                    <Text fontSize={".7rem"}> Posts</Text>
                  </Flex>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    direction={"column"}
                    borderRadius="50%"
                    h="6rem"
                    w="6rem"
                    bg={colorMode === "dark" ? "#1f222f" : "#f6f5f5"}
                  >
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      {" "}
                      0{" "}
                    </Text>
                    <Text fontSize={".7rem"}> Comments</Text>
                  </Flex>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    direction={"column"}
                    borderRadius="50%"
                    h="6rem"
                    w="6rem"
                    bg={colorMode === "dark" ? "#1f222f" : "#f6f5f5"}
                  >
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                      {" "}
                      0{" "}
                    </Text>
                    <Text fontSize={".7rem"}> Followers</Text>
                  </Flex>
                </Flex>
                <Avatar
                  name="Emelder Okafor"
                  size={"2xl"}
                  mt={"-120px"}
                  border={"5px solid #1f222f"}
                  src="https://bit.ly/dan-abramov"
                />
                <Flex w="32%" gap={"1.5rem"}>
                  <Button onClick={onOpen} colorScheme="blue">
                    Edit
                  </Button>
                  <Button>
                    <Link href="/pages/dashboard">Go Back</Link>
                  </Button>

                  <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <EditProfileModal />
                  </Modal>
                </Flex>
              </Flex>
              <Heading fontSize={{ base: "xl", md: "2xl" }} mt="2rem">
                Emelder Okafor
              </Heading>
              <Text>Joined on Jun 23, 2023</Text>
              {/* <Box
              mx={"auto"}
              w={{ base: "100%", md: "40%" }}
              p={"14px"}
              borderRadius={"lg"}
              color={colorMode === "light" ? "#777a80" : "brand.350"}
            >
              <HStack>
                <Icon as={MdOutlineArticle} />
                <Text>0 posts published</Text>
              </HStack>
              <HStack>
                <Icon as={FaRegCommentDots} />
                <Text>0 comments written</Text>
              </HStack>
              <HStack>
                <Icon as={TiGroup} />
                <Text>0 followers</Text>
              </HStack>
              <HStack>
                <Icon as={IoIosPeople} fontSize={"lg"} />
                <Text>0 following</Text>
              </HStack>
            </Box> */}
            </Center>
          </Wrapper>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
