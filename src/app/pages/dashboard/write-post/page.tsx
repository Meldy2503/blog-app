"use client";

// import { db } from "@/app/firebase";
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
// import { ChatterContext } from "../context/ChatterContext";
import { BlogContext } from "../../../../../context/blog-context";
// import Modal from "./PreviewModal";
// import PreviewModal from "./PreviewModal";
import { useRouter } from "next/navigation";
// import { useAddPost } from "../hooks/post";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/hooks/auth";
import Preview from "@/app/components/preview";
import { db } from "../../../../../firebase";
import Wrapper from "@/app/components/wrapper";
import UserNavbar from "@/app/components/user-nav";
import PreviewModal from "@/app/components/preview-modal";

// import {
//   collection,
//   addDoc,
//   doc,
//   setDoc,
//   serverTimestamp,
// } from "firebase/firestore";

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

// interface Entry {
//   author?: string;
//   brief?: string;
//   body: string;
//   category?: string;
//   postedOn?: any;
//   title: string;
//   bannerImage?: string;
//   postLength: number;
// }

const LiteEditor: React.FC = () => {
  const { user } = useAuth();
  const { currentUser } = useContext(BlogContext);

  const { entry, setEntry } = useContext(BlogContext);
  const { colorMode } = useColorMode();
  const mdParser = new MarkdownIt();
  const toast = useToast();
  const [publishLoading, setPublishLoading] = useState(false);
  // const [entry, setEntry] = useState<Entry>({
  //   author: currentUser?.email || user?.email,
  //   title: "",
  //   brief: "",
  //   bannerImage: "",
  //   category: "",
  //   body: "",
  //   postedOn: "",
  //   postLength: 0,
  // });
  const [draftLoading, setDraftLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  // const { addPost, publishLoading } = useAddPost();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // function onImageUpload(file) {
  //   return new Promise((resolve) => {
  //     const url = URL.createObjectURL(file);
  //     resolve(url);
  //   });
  // }

  // function handleAddPost() {
  //   addPost(entry);
  // }

  function calculateReadTime(content: string) {
    const wordCount = content.trim().split(/\s+/).length;
    const averageReadingSpeed = 200;
    const readTime = Math.ceil(wordCount / averageReadingSpeed);
    return readTime;
  }

  const handleEditorChange = ({ text }: { text: string }) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      body: text,
    }));
  };

  // const timestamp: number = new Date().getTime();
  // const date: Date = new Date(timestamp);
  // const formattedDate: string = date.toLocaleDateString("en-US", {
  //   month: "short",
  //   day: "numeric",
  //   year: "numeric",
  // });

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

  console.log(entry);

  const handlePublish = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPublishLoading(true);
    try {
      const articlesRef = collection(db, "articles");
      await addDoc(articlesRef, entry);
      toast({
        title: "Article Published Successfully!",
        // description: "Your article has been .",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });

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
      toast({
        title: "Error Publishing Article",
        // description: "We've created your account for you.",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
    }
  };

  const handleSaveToDraft = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDraftLoading(true);
    try {
      const draftRef = collection(db, "draft");
      await addDoc(draftRef, entry);
      toast({
        title: "Article Saved to Drafts!",
        // description: "We've created your account for you.",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
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
      toast({
        title: "Error Publishing Article",
        // description: "We've created your account for you.",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
    }
  };

  return (
    <>
      <UserNavbar />
      <Wrapper>
        <form>
          <Flex flexDir={"column"} justify={"flex-end"}>
            <HStack justify={"space-between"} w={"100%"}>
              {/* <Box /> */}
              <Button onClick={onOpen}>Preview</Button>
              <PreviewModal isOpen={isOpen} onClose={onClose}>
                {/* <PreviewModal /> */}
                fffffff
              </PreviewModal>
              <ButtonGroup as={Flex} mb={"10px"} justifySelf={"flex-end"}>
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
            </HStack>
            <Input
              placeholder="Title"
              type="text"
              name="title"
              fontSize="2xl"
              onChange={handleInputChange}
              value={entry.title}
              fontWeight={600}
            />
            <Input
              placeholder="Brief"
              type="text"
              name="brief"
              onChange={handleInputChange}
              value={entry.brief}
            />
            <Input
              placeholder="Cover Image URL"
              type="text"
              name="bannerImage"
              onChange={handleInputChange}
              value={entry.bannerImage}
            />

            <Select
              // {...register("joiningAs")}
              placeholder="Select Category"
              name="category"
              border="1px solid"
              borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
              value={entry.category}
              onChange={handleCategoryChange}
            >
              {/* <option value="">Select Category</option> */}
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Select>
          </Flex>

          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            view={{ menu: true, md: true, html: false }}
            // onImageUpload={onImageUpload}
          />
        </form>
      </Wrapper>
    </>
  );
};

export default LiteEditor;
