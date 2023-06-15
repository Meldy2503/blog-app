import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { VscBook } from "react-icons/vsc";
import { MdOutlineAnalytics } from "react-icons/md";
import { BiChat } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

const ForYou = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      color={colorMode === "dark" ? "#c2c1c1" : "#626262"}
      border={`1px solid ${
        colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
      }`}
      borderRadius={"6px"}
    >
      <Box px={{ base: "1rem", lg: "2rem" }} py="2rem">
        <Flex align={"center"} gap="1.5rem">
          <Box>
            <Image
              src="/assets/face-1.jpg"
              alt="a person's face"
              style={{
                borderRadius: "50%",
              }}
              height={120}
              width={120}
            />
          </Box>
          <Box>
            <Heading
              as={"h4"}
              fontSize={"1.3rem"}
              fontWeight={550}
              color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
              mb=".5rem"
            >
              Grace Ikpang{" "}
            </Heading>
            <Text>Product designer,May 25th, 2023</Text>
          </Box>
        </Flex>
        <Box mb="1rem" mt="1.5rem">
          <Heading
            as={"h5"}
            fontSize={"1.5rem"}
            fontWeight={550}
            color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
          >
            Starting out as a Product designer
          </Heading>
          <Flex align={"center"} gap=".5rem" mb="1rem" mt=".7rem">
            <Icon
              as={VscBook}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            />

            <Text fontSize={".9rem"}>10 mins read</Text>
          </Flex>
          <Text>
            Embarking on a journey as a product designer can be an exhilarating
            and fulfilling experience. As a profession that bridges the realms
            of art, technology, and problem-solving, product design offers an
            opportunity to shape the way people interact with the world around
            them.
          </Text>
        </Box>
        <Box>
          <Image
            src="/assets/feed.png"
            alt="feed image"
            style={{
              objectFit: "cover",
            }}
            height={500}
            width={500}
          />{" "}
        </Box>
        <Flex mt="1rem" justify={"space-between"} align={"center"}>
          <HStack>
            <Icon
              as={BiChat}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            />
            <Text fontSize={".9rem"}>110</Text>
          </HStack>
          <HStack>
            <Icon
              as={AiOutlineHeart}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            />
            <Text fontSize={".9rem"}>20 likes</Text>
          </HStack>
          <HStack>
            <Icon
              as={MdOutlineAnalytics}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            />
            <Text fontSize={".9rem"}>2000 views</Text>
          </HStack>
        </Flex>
      </Box>

      <hr />

      {/* next post */}
      <Box px={{ base: "1rem", md: "1.5rem", lg: "4.5rem" }} py="2rem">
        <Flex align={"center"} gap="1.5rem">
          <Box>
            <Image
              src="/assets/face-3.jpg"
              alt="a person's face"
              style={{
                borderRadius: "50%",
              }}
              height={120}
              width={120}
            />
          </Box>
          <Box>
            <Heading
              as={"h4"}
              fontSize={"1.3rem"}
              fontWeight={550}
              color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
              mb=".5rem"
            >
              Edward Smith
            </Heading>
            <Text>Product designer,May 25th, 2023</Text>
          </Box>
        </Flex>
        <Box mb="1rem" mt="1.5rem">
          <Heading
            as={"h5"}
            fontSize={"1.5rem"}
            fontWeight={550}
            color={colorMode === "dark" ? "#d0d0d0" : "#111111"}
          >
            Starting out as a Product designer
          </Heading>
          <Flex align={"center"} gap=".5rem" mb="1rem" mt=".7rem">
            <Icon
              as={VscBook}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            />

            <Text fontSize={".9rem"}>10 mins read</Text>
          </Flex>
          <Text>
            Embarking on a journey as a product designer can be an exhilarating
            and fulfilling experience. As a profession that bridges the realms
            of art, technology, and problem-solving, product design offers an
            opportunity to shape the way people interact with the world around
            them.
          </Text>
        </Box>
        <Box>
          <Image
            src="/assets/feed.png"
            alt="feed image"
            style={{
              objectFit: "cover",
            }}
            height={500}
            width={500}
          />
        </Box>
        <Flex mt="1rem" justify={"space-between"} align={"center"}>
          <HStack>
            <Icon
              as={BiChat}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            />
            <Text fontSize={".9rem"}>110</Text>
          </HStack>
          <HStack>
            <Icon
              as={AiOutlineHeart}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            />
            <Text fontSize={".9rem"}>20 likes</Text>
          </HStack>
          <HStack>
            <Icon
              as={MdOutlineAnalytics}
              color={colorMode === "dark" ? "#f5f6f6" : "#111111"}
            />
            <Text fontSize={".9rem"}>2000 views</Text>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default ForYou;
