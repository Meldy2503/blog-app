"use client";

import { useAuth } from "../../hooks/auth";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useAddComment } from "../../hooks/likes-comments";
import TextareaAutoSize from "react-textarea-autosize";
import { Posts } from "../../context/blog-context";

interface NewCommentProps {
  post: Posts;
}

const NewComment: React.FC<NewCommentProps> = ({ post }) => {
  const postID = post.id || "";
  const { user, isLoading: authLoading } = useAuth();
  const { addComment, isLoading: commentLoading } = useAddComment({
    postID,
    email: user?.email || "",
  });
  const { colorMode } = useColorMode();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddComment = (data: any) => {
    addComment(data.text);
    reset();
  };

  return (
    <Flex gap={"10px"}>
      <Flex flex={0.1}>
        <Avatar src={user?.imagUrl} name={user?.name} size="md" />
      </Flex>
      <Flex flex={0.9}>
        <Box w="100%">
          <form onSubmit={handleSubmit(handleAddComment)} className="form">
            <Box>
              <Textarea
                as={TextareaAutoSize}
                resize="none"
                placeholder="Add to the discussion"
                border={`1px solid ${
                  colorMode === "dark" ? "rgb(255, 255, 255, .1)" : "#d0d0d0"
                }`}
                w={"full"}
                size={"xl"}
                autoComplete="off"
                minRows={3}
                borderRadius={"md"}
                px={3}
                {...register("text", { required: true })}
              />
              <Button
                mt={2}
                justifySelf={"flex-end"}
                isLoading={commentLoading || authLoading}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NewComment;
