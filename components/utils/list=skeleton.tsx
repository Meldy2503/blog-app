"use client";

import { Stack, Skeleton } from "@chakra-ui/react";
import React from "react";

const ListSkeleton = () => {
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

export default ListSkeleton;
