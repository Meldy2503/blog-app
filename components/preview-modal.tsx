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
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { BlogContext } from "../context/blog-context";
import { useContext } from "react";
import { VscBook } from "react-icons/vsc";
import Image from "next/image";
import { MarkdownRenderer } from "./markdown-styles";
import { calculateReadTime } from "./utils/functions";

const PreviewModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { entry } = useContext(BlogContext);

  return (
    <>
      <Button onClick={onOpen} bg="#aadfdf" shadow={"md"} color="#333">
        Preview
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"3xl"}>
        <ModalOverlay bgGradient="linear(to-l,rgb(0, 0, 0, 0.4),rgb(0, 0, 0, 0.4))" />
        <ModalContent>
          <ModalHeader
            color={colorMode === "light" ? "brand.800" : "brand.400"}
          >
            Post Preview
          </ModalHeader>
          <ModalCloseButton
            color={colorMode === "light" ? "brand.800" : "brand.400"}
          />
          <ModalBody>
            <Box
              borderRadius={"lg"}
              mb={4}
              color={colorMode === "light" ? "brand.800" : "brand.400"}
            >
              <Stack mx={{ base: "0px", lg: "44px" }}>
                <>
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
                        gap={"2rem"}
                        borderY={`1px solid ${
                          colorMode === "dark"
                            ? "rgb(255, 255, 255, .1)"
                            : "#d0d0d0"
                        }`}
                      >
                        <HStack>
                          <Icon as={VscBook} />
                          <Text>
                            {calculateReadTime(entry?.body)} mins read
                          </Text>
                        </HStack>
                        <Button borderRadius={"50px"} py="0">
                          {entry?.category}
                        </Button>
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
                </>

                <MarkdownRenderer markdownContent={entry?.body} />
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
