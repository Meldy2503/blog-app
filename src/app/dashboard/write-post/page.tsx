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
import { BlogContext } from "../../../../context/blog-context";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../hooks/auth";
import { db } from "../../../../firebase";
import Wrapper from "../../../../components/wrapper";
import PreviewModal from "../../../../components/preview-modal";
import Navbar from "../../../../components/navbar";
import { ErrorToast, SuccessToast } from "../../../../components/utils/toast";
import { handleGoBack } from "../../../../components/utils/functions";
import { BsArrowLeftSquare } from "react-icons/bs";
import { categories } from "../../../../components/utils/constants";

const LiteEditor: React.FC = () => {
  const { user } = useAuth();
  const { currentUser } = useContext(BlogContext);
  const [showCategory, setShowCategory] = useState(false);

  const { entry, setEntry } = useContext(BlogContext);
  const { colorMode } = useColorMode();
  const mdParser = new MarkdownIt();
  const [publishLoading, setPublishLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const router = useRouter();

  function calculateReadTime(content: string) {
    const wordCount = content.trim().split(/\s+/).length;
    const averageReadingSpeed = 100;
    const readTime = Math.ceil(wordCount / averageReadingSpeed);
    return readTime;
  }

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
  };

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

  console.log(entry, "entry");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const handlePublish = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPublishLoading(true);
    try {
      const articlesRef = collection(db, "articles");
      await addDoc(articlesRef, entry);
      SuccessToast("Article Published Successfully!");

      router.push("/dashboard");
      setEntry({
        title: "",
        brief: "",
        bannerImage: "",
        category: "",
        body: "",
        postedOn: "",
        postLength: 0,
      });
    } catch (error) {
      ErrorToast("Error Publishing Article!");
    }
  };

  const handleSaveToDraft = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDraftLoading(true);
    try {
      const draftRef = collection(db, "draft");
      await addDoc(draftRef, entry);
      SuccessToast("Article successfully saved to Drafts!");

      setDraftLoading(false);
      router.push("/dashboard/drafts");
      setEntry({
        title: "",
        bannerImage: "",
        body: "",
        category: "",
        postedOn: "",
        postLength: 0,
      });
    } catch (error) {
      ErrorToast("Article not saved to Drafts!");
    }
  };

  useEffect(() => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      postLength: calculateReadTime(entry.body),
      postedOn: serverTimestamp(),
      author: currentUser?.email || user?.email,
    }));
  }, [entry.body, setEntry, currentUser?.email, user?.email]);

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
              type="submit"
              onClick={handleSaveToDraft}
              isLoading={draftLoading}
              _hover={{ bg: "#9a9c9b" }}
              bg={colorMode === "light" ? "#d0d0d0" : "#424660"}
              shadow={"md"}
              color={colorMode === "light" ? "dark" : "#d0d0d0"}
            >
              Save to draft
            </Button>
            <Button
              type="submit"
              onClick={handlePublish}
              isLoading={publishLoading}
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
