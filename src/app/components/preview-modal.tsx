import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  useDisclosure,
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { BlogContext } from "../../../context/blog-context";
import { useContext } from "react";
import MarkdownIt from "markdown-it";
import { VscBook } from "react-icons/vsc";
import Image from "next/image";

const PreviewModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { entry } = useContext(BlogContext);

  function calculateReadTime(content: string) {
    const wordCount = content.trim().split(/\s+/).length;
    const averageReadingSpeed = 50;
    const readTime = Math.ceil(wordCount / averageReadingSpeed);
    return readTime;
  }

  function renderMarkdownToHtml(markdownText: string): React.ReactNode {
    const md = new MarkdownIt();
    const html = md.render(markdownText);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <>
      <Button onClick={onOpen}>Preview</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"3xl"}>
        <ModalOverlay bgGradient="linear(to-l,rgb(0, 0, 0, 0.4),rgb(0, 0, 0, 0.4))" />
        <ModalContent>
          <ModalHeader>Post Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              borderRadius={"lg"}
              mb={4}
              color={colorMode === "light" ? "brand.800" : "brand.400"}
            >
              <Stack mx={{ base: "0px", lg: "44px" }}>
                <Box>
                  <Heading
                    fontWeight={600}
                    fontSize={"3rem"}
                    mt={"10px"}
                    mb="30px"
                  >
                    {entry?.title}
                  </Heading>
                  <Flex>
                    <Flex gap={5} direction="column" mb="2rem" w="100%">
                      <Flex
                        py=".7rem"
                        w="100%"
                        align={"center"}
                        gap={"1rem"}
                        borderY={`1px solid ${
                          colorMode === "dark"
                            ? "rgb(255, 255, 255, .1)"
                            : "#d0d0d0"
                        }`}
                      >
                        <Icon as={VscBook} />
                        <Text>{calculateReadTime(entry?.body)} mins read</Text>
                      </Flex>
                      <Text>{entry?.brief}</Text>
                    </Flex>
                  </Flex>
                  <Flex flex={0.7} mb="1.5rem">
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

                  <Box>{renderMarkdownToHtml(entry?.body)}</Box>
                </Box>
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewModal;
