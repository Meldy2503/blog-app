"use client";

import { Stack, Skeleton, HStack } from "@chakra-ui/react";
import React from "react";

export const ListSkeleton = () => {
  return (
    <Stack spacing={6} mt="1rem" pl="2rem">
      <Skeleton height="12px" w={"100px"} />
      <Skeleton height="12px" w={"100px"} />
      <Skeleton height="12px" w={"100px"} />
      <Skeleton height="12px" w={"100px"} />
      <Skeleton height="12px" w={"100px"} />
      <Skeleton height="12px" w={"100px"} />
    </Stack>
  );
};
export const ListHoriSkeleton = () => {
  return (
    <HStack spacing={6} mt="1rem" pl="2rem" w="100%" flexWrap="wrap">
      <Skeleton height="12px" w={"100px"} />
      <Skeleton height="12px" w={"100px"} />
      <Skeleton height="12px" w={"100px"} />
      <Skeleton height="12px" w={"100px"} />
      <Skeleton height="12px" w={"100px"} />
      <Skeleton height="12px" w={"100px"} />
    </HStack>
  );
};
export const RecentPostsSkeleton = () => {
  return (
    <Stack spacing={6} mt="1rem" pt="2rem">
      <Skeleton height="50px" w={"100%"} />
      <Skeleton height="50px" w={"100%"} />
      <Skeleton height="50px" w={"100%"} />
    </Stack>
  );
};
