"use client";

import React from "react";
import { Posts } from "../../../../context/blog-context";
import { useComments } from "@/app/hooks/likes-comments";
import Comment from "./comments";
import { Stack } from "@chakra-ui/react";

interface CommentListProps {
  post: Posts;
}

const CommentList: React.FC<CommentListProps> = ({ post }) => {
  const { id } = post;

  const { comments, isLoading } = useComments(id?.toString() || "");

  return (
    <Stack spacing={8} mt={"35px"} ml={"55px"}>
      {comments?.map((comment: any) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
};

export default CommentList;
