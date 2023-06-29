"use client";

import React from "react";
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

const WritePost = () => {
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
          <Button>Publish</Button>
          <Button>
            <Link href="/pages/dashboard">Go to Dashboard</Link>
          </Button>
        </Flex>
        <FormControl mb="2rem">
          <FormLabel>Title</FormLabel>
          <Input placeholder="Title" focusBorderColor="none" />
        </FormControl>
        <FormControl mb="2rem">
          <FormLabel>Brief</FormLabel>
          <Input placeholder="Brief" focusBorderColor="none" />
        </FormControl>
        <FormControl mb="2rem">
          <FormLabel>Image</FormLabel>
          <Input placeholder="Image" focusBorderColor="none" />
        </FormControl>
        <FormControl mb="2rem">
          <FormLabel>Category</FormLabel>
          <Select focusBorderColor="none">
            <option disabled>--Select--</option>
            <option>Programming</option>
            <option>Science</option>
          </Select>
        </FormControl>
        <FormControl mb="2rem">
          <FormLabel>Body</FormLabel>
          <Textarea focusBorderColor="none" />
        </FormControl>
      </Wrapper>
    </>
  );
};

export default WritePost;
