"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Input,
  Select,
  Text,
  useColorMode,
  useDisclosure,
  Modal,
  useToast,
} from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { BlogContext } from "../../../../../context/blog-context";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/hooks/auth";
import { db } from "../../../../../firebase";
import Wrapper from "@/app/components/wrapper";
import PreviewModal from "@/app/components/preview-modal";
import Navbar from "@/app/components/navbar";
import { ErrorToast, SuccessToast } from "@/app/components/utils/toast";
import { handleGoBack } from "@/app/components/utils/functions";
const categories = [
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "business", label: "Business" },
  { value: "politics", label: "Politics" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "travel", label: "Travel" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "food", label: "Food" },
];

const LiteEditor: React.FC = () => {
  const { user } = useAuth();
  const { currentUser } = useContext(BlogContext);
  const [showCategory, setShowCategory] = useState(false);

  const { entry, setEntry } = useContext(BlogContext);
  const { colorMode } = useColorMode();
  const mdParser = new MarkdownIt();
  const toast = useToast();
  const [publishLoading, setPublishLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function calculateReadTime(content: string) {
    const wordCount = content.trim().split(/\s+/).length;
    const averageReadingSpeed = 100;
    const readTime = Math.ceil(wordCount / averageReadingSpeed);
    return readTime;
  }

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  const handleEditorChange = ({ text }: { text: string }) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      body: text,
    }));
  };

  useEffect(() => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      postLength: calculateReadTime(entry.body),
      postedOn: serverTimestamp(),
      author: currentUser?.email || user?.email,
    }));
  }, [entry.body, setEntry, currentUser?.email, user?.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

      router.push("/pages/dashboard");
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
      router.push("/pages/dashboard/drafts");
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

  return (
    <>
      <Navbar />
      <Wrapper>
        <form>
          <Flex flexDir={"column"} justify={"flex-end"}>
            <HStack justify={"space-between"} w={"100%"} mb="2rem">
              <PreviewModal />
              <Button onClick={() => handleGoBack(router)}>Go Back</Button>
            </HStack>
            <Input
              placeholder="Title"
              type="text"
              name="title"
              py="2.5rem"
              fontSize={{ base: "2rem", md: "3rem" }}
              border="none"
              focusBorderColor="none"
              _placeholder={{ letterSpacing: "0.2rem" }}
              onChange={handleInputChange}
              value={entry.title}
              fontWeight={600}
            />
            <Input
              placeholder="Write a brief description..."
              fontSize={"1.2rem"}
              mt="1rem"
              type="text"
              border="none"
              focusBorderColor="none"
              name="brief"
              onChange={handleInputChange}
              value={entry.brief}
            />
            <Input
              placeholder="Add cover image URL"
              type="text"
              border="none"
              mt="1.5rem"
              fontSize={"1.2rem"}
              focusBorderColor="none"
              name="bannerImage"
              onChange={handleInputChange}
              value={entry.bannerImage}
            />

            {/* <Select
              {...register("joiningAs")}
              placeholder="Select Category"
              name="category"
              border="1px solid"
              borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
              value={entry.category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <Box as="option" key={category.value} value={category.value}>
                  <Box bg="red" p="1rem" borderRadius={"50%"}>
                    {category.label}
                  </Box>
                </Box>
              ))}
            </Select> */}

            <Flex
              my="2rem"
              gap={{ base: "1rem", md: "3rem" }}
              justify={"space-between"}
              direction={{ base: "column", md: "row" }}
            >
              <Box
                onClick={handleShowCategory}
                cursor={"pointer"}
                w={{ base: "100%", md: "20%" }}
              >
                <Text
                  w="10rem"
                  borderRadius={"7rem"}
                  bg="red"
                  px=".8rem"
                  py=".4rem"
                  // h="3rem"
                >
                  Select Category
                </Text>
              </Box>
              {showCategory && (
                <Flex
                  columnGap="1.5rem"
                  flexWrap="wrap"
                  rowGap={"1rem"}
                  py={{ base: "1rem", md: "0" }}
                  w={{ base: "100%", md: "75%" }}
                  h={{ base: "10rem", md: "fit-content" }}
                  overflowY="auto"
                  className="side-nav"

                  // justify={"center"}
                  // align={"center"}
                >
                  {categories?.map((category) => (
                    <Box
                      key={category.value}
                      bg="red"
                      px=".8rem"
                      py=".3rem"
                      w="fit-content"
                      borderRadius={"6rem"}
                      cursor={"pointer"}
                    >
                      {category.label} +
                    </Box>
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
            // onImageUpload={onImageUpload}
            value={entry.body}
            shortcuts={true}
            // canView={{
            //   menu: true,
            //   md: true,
            //   html: false,
            //   both: false,
            //   fullScreen: false,
            //   hideMenu: false,
            // }}
          />
          {/* <MdEditor
               className="ms-[250px] h-[400px] tabletS:ms-0"
               renderHTML={(text) => mdParser.render(text)}
               onChange={handleEditorChange}
               value={body}
               shortcuts={true}
               view={{ menu: true, md: true, html: false }}
               canView={{
                  menu: true,
                  md: true,
                  html: false,
                  both: false,
                  fullScreen: false,
                  hideMenu: false,
               }}
            /> */}
        </form>
        <ButtonGroup
          as={Flex}
          mt={"3rem"}
          justifyContent={"flex-end"}
          gap="2rem"
        >
          <Button
            type="submit"
            bg="#543EE0"
            _hover={{ bg: "#715fe3" }}
            color={"white"}
            onClick={handleSaveToDraft}
            isLoading={draftLoading}
          >
            Save to draft
          </Button>
          <Button
            type="submit"
            bg="#543EE0"
            _hover={{ bg: "#715fe3" }}
            color={"white"}
            onClick={handlePublish}
            isLoading={publishLoading}
          >
            Publish
          </Button>
        </ButtonGroup>
      </Wrapper>
    </>
  );
};

export default LiteEditor;
