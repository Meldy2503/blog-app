import React from "react";
import { Box, Flex, useColorMode, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";

export const HeroImg = () => {
  const { colorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  return (
    <Box position="relative">
      <Flex my="4rem" w="100%" gap="8.3rem">
        <Box m="auto" textAlign={"center"}>
          <Flex
            position="relative"
            align={"center"}
            justify={"center"}
            height={{ base: "20rem", sm: "25rem", md: "30rem" }}
            width={{ base: "20rem", sm: "25rem", md: "30rem" }}
            borderRadius={"50%"}
            border={`1px solid ${
              colorMode === "dark" ? "rgb(255, 255, 255, .25)" : "#757474"
            }`}
          >
            <Image
              width={200}
              height={200}
              src="/assets/face-3.jpg"
              alt="img2"
              style={{
                position: "absolute",
                zIndex: "10",
                top: "2rem",
                right: "4rem",
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                objectFit: "cover",
                objectPosition: "center",
                border: `1px solid ${
                  colorMode === "dark" ? "transparent" : "#d0d0d0"
                }`,
              }}
            />
            {!isMobile && (
              <Image
                width={200}
                height={200}
                src="/assets/img2.jpg"
                alt="img2"
                style={{
                  position: "absolute",
                  top: "9rem",
                  zIndex: "10",

                  left: "-1rem",
                  borderRadius: "50%",
                  width: "3.5rem",
                  height: "3.5rem",
                  objectFit: "cover",
                  objectPosition: "center",
                  border: `1px solid ${
                    colorMode === "dark" ? "transparent" : "#d0d0d0"
                  }`,
                }}
              />
            )}

            <Image
              width={200}
              height={200}
              src="/assets/img3.jpg"
              alt="img4"
              style={{
                position: "absolute",
                right: "3rem",
                zIndex: "10",

                bottom: "3rem",
                borderRadius: "50%",
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
                objectPosition: "center",
                border: `1px solid ${
                  colorMode === "dark" ? "transparent" : "#d0d0d0"
                }`,
              }}
            />

            <Image
              width={200}
              height={200}
              src="/assets/img4.jpg"
              alt="img4"
              style={{
                position: "absolute",
                left: "6rem",
                zIndex: "10",

                bottom: "1rem",
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                objectFit: "cover",
                objectPosition: "center",
                border: `1px solid ${
                  colorMode === "dark" ? "transparent" : "#d0d0d0"
                }`,
              }}
            />
            <Flex
              position="relative"
              align={"center"}
              justify={"center"}
              height={{ base: "16rem", sm: "20rem", md: "25rem" }}
              width={{ base: "16rem", sm: "20rem", md: "25rem" }}
              borderRadius={"50%"}
              border={`1px solid ${
                colorMode === "dark" ? "rgb(255, 255, 255, .25)" : "#757474"
              }`}
              alignContent={"center"}
            >
              <Box
                bg="yellow"
                w="1.5rem"
                h="1.5rem"
                borderRadius="50%"
                position="absolute"
                top="1.2rem"
                left="5rem"
              />

              <Box
                bg="blue"
                w="1rem"
                h="1rem"
                borderRadius="50%"
                position="absolute"
                bottom="13rem"
                right="-.5rem"
              />

              <Flex
                position="relative"
                align={"center"}
                justify={"center"}
                height={{ base: "11rem", sm: "15rem", md: "20rem" }}
                width={{ base: "11rem", sm: "15rem", md: "20rem" }}
                borderRadius={"50%"}
                border={`1px solid ${
                  colorMode === "dark" ? "rgb(255, 255, 255, .25)" : "#757474"
                }`}
                alignContent={"center"}
              >
                <Image
                  width={200}
                  height={200}
                  src="/assets/img7.svg"
                  alt="img7"
                  style={{
                    position: "absolute",
                    top: "-1rem",
                    zIndex: "10",

                    right: "12rem",
                    borderRadius: "50%",
                    width: "3.5rem",
                    height: "3.5rem",
                    objectFit: "cover",
                    objectPosition: "center",
                    border: `1px solid ${
                      colorMode === "dark" ? "transparent" : "#d0d0d0"
                    }`,
                  }}
                />

                <Box
                  bg="red"
                  w="1rem"
                  h="1rem"
                  borderRadius="50%"
                  position="absolute"
                  bottom="-.2rem"
                  left="12rem"
                />

                <Image
                  width={200}
                  height={200}
                  src="/assets/img5.jpg"
                  alt="img8"
                  style={{
                    position: "absolute",
                    left: "-1rem",
                    zIndex: "10",

                    bottom: "7rem",
                    borderRadius: "50%",
                    width: "2.5rem",
                    height: "2.5rem",
                    objectFit: "cover",
                    objectPosition: "center",
                    border: `1px solid ${
                      colorMode === "dark" ? "transparent" : "#d0d0d0"
                    }`,
                  }}
                />

                <Flex
                  position="relative"
                  align={"center"}
                  justify={"center"}
                  w="15rem"
                  height="15rem"
                  borderRadius={"50%"}
                  border={{
                    base: "none",
                    md: `1px solid ${
                      colorMode === "dark"
                        ? "rgb(255, 255, 255, .25)"
                        : "#757474"
                    }`,
                  }}
                  alignContent={"center"}
                >
                  <Image
                    width={200}
                    height={200}
                    src="/assets/img6.jpg"
                    alt="img13"
                    style={{
                      position: "absolute",
                      top: "3rem",
                      zIndex: "10",

                      right: "0rem",
                      borderRadius: "50%",
                      width: "2.5rem",
                      height: "2.5rem",
                      objectFit: "cover",
                      objectPosition: "center",

                      border: `1px solid ${
                        colorMode === "dark" ? "transparent" : "#d0d0d0"
                      }`,
                    }}
                  />
                  <Flex align={"center"} justify={"center"}>
                    <Image
                      width={100}
                      height={100}
                      src="/assets/bg0.svg"
                      alt="img13"
                      style={{
                        borderRadius: "50%",
                        zIndex: "10",

                        width: isMobile ? "8rem" : "10rem",
                        height: isMobile ? "8rem" : "10rem",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
