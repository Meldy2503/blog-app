"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Input,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { BlogContext, Entry } from "../../../../context/blog-context";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../hooks/auth";
import Wrapper from "../../../../components/wrapper";
import PreviewModal from "../../../../components/preview-modal";
import Navbar from "../../../../components/navbar";
import { ErrorToast } from "../../../../components/utils/toast";
import {
  calculateReadTime,
  handleGoBack,
} from "../../../../components/utils/functions";
import { BsArrowLeftSquare } from "react-icons/bs";
import { categories } from "../../../../components/utils/constants";
import { useAddPost } from "../../../../hooks/posts";
import { uuidv4 } from "@firebase/util";

const LiteEditor: React.FC = () => {
  const { user } = useAuth();
  const { currentUser } = useContext(BlogContext);
  const [showCategory, setShowCategory] = useState(false);
  const { entry, setEntry } = useContext(BlogContext);
  const { colorMode } = useColorMode();
  const mdParser = new MarkdownIt();
  const router = useRouter();
  const { addPost, isLoading: publishingPost } = useAddPost();
  const id = uuidv4();

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  async function handlePublish(
    entry: Entry,
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    if (
      entry.title === "" ||
      entry.body === "" ||
      entry.category === "" ||
      entry.brief === "" ||
      entry.bannerImage === ""
    ) {
      ErrorToast("Please fill all the fields!");
    } else {
      addPost({
        author: currentUser?.email || user?.email,
        title: entry.title,
        bannerImage: entry.bannerImage,
        body: entry.body,
        category: entry.category,
        postLength: entry.postLength,
        postedOn: Date.now(),
        brief: entry.brief,
        id,
      });
    }
  }

  const handleCategoryChange = (selectedCategory: any) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      category: selectedCategory,
    }));
    setShowCategory(!showCategory);
  };

  const handleEditorChange = ({ text }: { text: string }) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      body: text,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  useEffect(() => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      postLength: calculateReadTime(entry?.body),
    }));
  }, [entry?.body, setEntry]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <HStack
          justify={"space-between"}
          w={"100%"}
          mb="1rem"
          pb="1.5rem"
          align={"center"}
          borderBottom={`1px solid ${
            colorMode === "dark" ? "rgb(255, 255, 255, .1)" : "#d0d0d0"
          }`}
        >
          <Box
            onClick={() => handleGoBack(router)}
            color={colorMode === "light" ? "#2a2929" : "#d0d0d0"}
          >
            <Icon as={BsArrowLeftSquare} boxSize={"2rem"} />
          </Box>
          <ButtonGroup as={Flex} justifyContent={"flex-end"} gap="1rem">
            <Button
              isDisabled={true}
              type="submit"
              bg={colorMode === "light" ? "#d0d0d0" : "#424660"}
              shadow={"md"}
              color={colorMode === "light" ? "dark" : "#d0d0d0"}
            >
              Save to draft
            </Button>
            <Button
              type="submit"
              onClick={(event) => handlePublish(entry, event)}
              isLoading={publishingPost}
              bg="#29a546"
              _hover={{ bg: "#308b45" }}
              color={"white"}
            >
              Publish
            </Button>
          </ButtonGroup>
        </HStack>
        <form>
          <Flex
            flexDir={"column"}
            justify={"flex-end"}
            color={colorMode === "light" ? "dark" : "#cac9c9"}
          >
            <Input
              placeholder="Title..."
              type="text"
              name="title"
              py="2rem"
              px="0"
              fontSize={{ base: "2rem", md: "3rem" }}
              border="none"
              focusBorderColor="none"
              _placeholder={{ letterSpacing: "0.2rem" }}
              onChange={handleInputChange}
              value={entry.title}
              fontWeight={600}
              required
            />
            <Input
              placeholder="Write a brief description..."
              fontSize={"1.2rem"}
              mt="1rem"
              type="text"
              px="0"
              border="none"
              focusBorderColor="none"
              name="brief"
              onChange={handleInputChange}
              value={entry.brief}
              required
            />
            <Input
              placeholder="Add cover image URL..."
              type="text"
              border="none"
              mt="1rem"
              px="0"
              fontSize={"1.2rem"}
              focusBorderColor="none"
              name="bannerImage"
              onChange={handleInputChange}
              value={entry.bannerImage}
              required
            />
            <Flex
              my="1.8rem"
              gap="1rem"
              justify={"space-between"}
              direction="column"
            >
              <HStack align={"center"} justify={"space-between"}>
                <Button
                  onClick={handleShowCategory}
                  cursor={"pointer"}
                  w="fit-content"
                  borderRadius="7rem"
                  px="1.2rem"
                  py=".4rem"
                  bg={colorMode === "light" ? "#d0d0d0" : "#424660"}
                  shadow="md"
                  color={colorMode === "light" ? "dark" : "#d0d0d0"}
                >
                  {entry.category || "Select Category"}
                </Button>
                <PreviewModal />
              </HStack>

              {showCategory && (
                <Flex
                  columnGap="1.5rem"
                  flexWrap="wrap"
                  rowGap={"1rem"}
                  py="1rem"
                  h={{ base: "10rem", md: "fit-content" }}
                  overflowY="auto"
                  className="side-nav"
                >
                  {categories?.map((category) => (
                    <Button
                      key={category.value}
                      variant="none"
                      bg={colorMode === "light" ? "#f5f6f6" : "#2b2e40"}
                      shadow={"md"}
                      color={colorMode === "light" ? "dark" : "#d0d0d0"}
                      px=".8rem"
                      py=".2rem"
                      borderRadius={"6rem"}
                      cursor={"pointer"}
                      className="slide-in-from-left"
                      onClick={() => handleCategoryChange(category.label)}
                    >
                      {category.label}+
                    </Button>
                  ))}
                </Flex>
              )}
            </Flex>
          </Flex>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            view={{ menu: true, md: true, html: false }}
            shortcuts={true}
            canView={{
              menu: true,
              md: true,
              html: false,
              both: false,
              fullScreen: true,
              hideMenu: false,
            }}
          />
        </form>
      </Wrapper>
    </>
  );
};

export default LiteEditor;
