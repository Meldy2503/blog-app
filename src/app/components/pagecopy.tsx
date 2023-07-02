"use client";

import React, { useContext, useState } from "react";
import Wrapper from "@/app/components/wrapper";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
// import { useRouter } from "next/navigation";
import UserNavbar from "@/app/components/user-nav";
import Link from "next/link";
import { BlogContext, Posts } from "../../../context/blog-context";
import { useForm } from "react-hook-form";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { title } from "process";
import { useAuth } from "@/app/hooks/auth";

interface NewPostProps {
  //   id: string;
  // data: {
  author?: string;
  brief?: string;
  body: string;
  category?: string;
  postedOn?: any;
  title?: string;
  // postedOn?: firebase.firestore.Timestamp;
  bannerImage?: string;
  postLength?: number;
  // };
}

const WritePost = () => {
  const { user } = useAuth();

  const { currentUser } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [postLength, setPostLength] = useState("");

  const addPostToFirebase = async (event: any) => {
    event.preventDefault();
    await addDoc(collection(db, "articles"), {
      title: title,
      bannerImage: bannerImage,
      body: body,
      category: category,
      brief: brief,
      postLength: postLength,
      postedOn: serverTimestamp(),
      author: currentUser?.email || user?.email,
    });
  };

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<NewPostProps>();
  //   const router = useRouter();

  //   const handleGoBack = () => {
  //     router.back();
  //   };
  return (
    <>
      <UserNavbar />
      <Wrapper>
        <Flex
          justify={"end"}
          gap="2rem"
          mb="2rem
        "
        >
          <Button onClick={addPostToFirebase}>Publish</Button>
          <Button>
            <Link href="/pages/dashboard">Go to Dashboard</Link>
          </Button>
        </Flex>
        <FormControl mb="2rem">
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Title"
            focusBorderColor="none"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormControl>
        <FormControl mb="2rem">
          <FormLabel>Brief</FormLabel>
          <Input
            placeholder="Brief"
            focusBorderColor="none"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
          />
        </FormControl>
        <FormControl mb="2rem">
          <FormLabel>Image URL</FormLabel>
          <Input
            placeholder="Image"
            focusBorderColor="none"
            value={bannerImage}
            onChange={(event) => setBannerImage(event.target.value)}
          />
        </FormControl>
        <FormControl mb="2rem">
          <FormLabel>Post length</FormLabel>
          <Input
            placeholder="Posted on"
            focusBorderColor="none"
            value={postLength}
            onChange={(event) => setPostLength(event.target.value)}
          />
        </FormControl>
        <FormControl mb="2rem">
          <FormLabel>Posted on</FormLabel>
          <Input
            placeholder="Posted on"
            focusBorderColor="none"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
          />
        </FormControl>
        <FormControl mb="2rem">
          <FormLabel>Category</FormLabel>
          <Select
            focusBorderColor="none"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option disabled>--Select--</option>
            <option>Programming</option>
            <option>Science</option>
          </Select>
        </FormControl>
        <FormControl mb="2rem">
          <FormLabel>Body</FormLabel>
          <Textarea
            focusBorderColor="none"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </FormControl>
      </Wrapper>
    </>
  );
};

export default WritePost;
