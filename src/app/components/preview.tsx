"use client";

import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import Image from "next/image";
import { useContext } from "react";
import { VscBook } from "react-icons/vsc";
import { BlogContext } from "../../../context/blog-context";

const Preview = () => {
  const { colorMode } = useColorMode();
  const { entry } = useContext(BlogContext);

  function renderMarkdownToHtml(markdownText: string): React.ReactNode {
    const md = new MarkdownIt();
    const html = md.render(markdownText);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <>
      <Box
        borderRadius={"lg"}
        mb={6}
        color={colorMode === "light" ? "brand.800" : "brand.400"}
      >
        <Stack mt={27} mx={{ base: "0px", lg: "44px" }}>
          <Box>
            <Flex justify={"space-between"} w={"full"}>
              <Flex gap={2} mb={"15px"}>
                <Box>
                  <HStack flexWrap={"wrap"}>
                    <Text>{entry?.brief}</Text>
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <Text>{entry?.postedOn}</Text>
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <HStack>
                      <Icon as={VscBook} />{" "}
                      <Text>{entry?.postLength} mins read</Text>
                    </HStack>
                  </HStack>
                </Box>
              </Flex>
            </Flex>
            <Flex flex={0.7}>
              {entry?.bannerImage && (
                <Image
                  src={entry?.bannerImage}
                  alt="post image"
                  width={412}
                  height={142}
                  style={{
                    width: "612px",
                    objectFit: "cover",
                    height: "242px",
                    objectPosition: "center",
                  }}
                />
              )}
            </Flex>
            <Box>
              <Stack flex={1}>
                <Heading fontWeight={700} fontSize={"34px"} my={"30px"}>
                  {entry?.title}
                </Heading>

                <Box>{renderMarkdownToHtml(entry?.body)}</Box>
              </Stack>
            </Box>
          </Box>
          <HStack></HStack>
        </Stack>
      </Box>
    </>
  );
};

export default Preview;
