"use client";

import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorMode,
  Avatar,
} from "@chakra-ui/react";
import { formatDate } from "../utils/format-date";
import { useAuth } from "../../hooks/auth";
import Loader from "../utils/spinner";

const Comment = ({ comment }: any) => {
  const { text, date, email, id, postID } = comment;
  const { colorMode } = useColorMode();
  const { user } = useAuth();

  return (
    <Flex gap={"10px"}>
      <Avatar src={user?.imagUrl} name={user?.name} size="sm" />

      <Flex justify={"space-between"} w={"full"}>
        <Box>
          <Flex align={"center"}>
            <Heading fontSize={"16px"} fontWeight={600}>
              {user?.name}
            </Heading>
            <Box
              bg={colorMode === "light" ? "brand.800" : "brand.400"}
              borderRadius={"full"}
              mx={2}
              w={"4px"}
              h={"4px"}
            />
            <Text>{formatDate(date)}</Text>
          </Flex>
          <Flex>
            <Text>{text}</Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Comment;
