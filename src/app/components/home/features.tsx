import React from "react";
import Wrapper from "../wrapper";
import Image from "next/image";
import { Box, Flex, Heading, Icon, Text, useColorMode } from "@chakra-ui/react";
import { BsGraphUpArrow, BsNewspaper } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";

const Features = () => {
  const { colorMode } = useColorMode();

  const Data = [
    {
      id: 1,
      icon: BsGraphUpArrow,
      title: "Analytics",
      description:
        "Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time",
    },
    {
      id: 2,
      icon: IoIosPeople,
      title: "Social interactions",
      description:
        "Users on the platform can interact with posts they like, comment and engage in discussions",
    },
    {
      id: 3,
      icon: BsNewspaper,
      title: "Content creation",
      description:
        "Write nice and appealing with our in-built markdown, a rich text editor",
    },
  ];

  return (
    <Wrapper
      bg={colorMode === "light" ? "#fff" : "#171923"}
      color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
    >
      <Box>
        <Box>
          <Heading
            as={"h5"}
            fontSize={{ base: "1.9rem", md: "2.1rem", lg: "2.3rem" }}
            fontWeight={600}
            color={colorMode === "dark" ? "#fff" : "black"}
            textAlign={"center"}
            mb={"2rem"}
          >
            Why you should join chatter
          </Heading>
          <Text>
            Our goal is to make writers and readers see our platform as their
            next heaven for blogging, ensuring ease in interactions, connecting
            with like-minded peers, have access to favorite content based on
            interests and able to communicate your great ideas with people.
          </Text>
          <Flex
            justify={"space-between"}
            align={"center"}
            m="auto"
            mt="1rem"
            py="2rem"
            flexWrap={"wrap"}
            gap="2rem"
          >
            {Data.map((item) => {
              return (
                <Box
                  border={`1px solid ${
                    colorMode === "dark" ? "rgb(255, 255, 255, .1)" : "#d0d0d0"
                  }`}
                  borderRadius=".4rem"
                  width={{ base: "100%", md: "47%", lg: "31%" }}
                  height={{ base: "auto", md: "20rem" }}
                  key={item.id}
                  padding="1rem"
                  margin="auto"
                  bg={colorMode === "light" ? "#fff" : "#1a202c"}
                >
                  <Flex
                    justify={"center"}
                    align={"center"}
                    borderRadius="50%"
                    h="4rem"
                    w="4rem"
                    bg={
                      colorMode === "light"
                        ? "rgba(214, 209, 248, 0.2)"
                        : "#2d3748"
                    }
                  >
                    <Icon as={item.icon} boxSize={7} />
                  </Flex>
                  <Box>
                    <Heading
                      as={"h4"}
                      fontSize={"1.3rem"}
                      fontWeight={600}
                      mt=".5rem"
                      py="1rem"
                    >
                      {item.title}{" "}
                    </Heading>
                    <Text>{item.description}</Text>
                  </Box>
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Features;
