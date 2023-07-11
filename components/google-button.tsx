"use client";

import React, { useContext, useEffect } from "react";
import { Button, Icon, useColorMode } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

import { BlogContext } from "../context/blog-context";

interface Props {
  children: React.ReactNode;
}

const GoogleButton = ({ children }: Props) => {
  const { handleUserAuth, currentUser } = useContext(BlogContext);
  const { colorMode } = useColorMode();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  return (
    <Button
      type="submit"
      onClick={handleUserAuth}
      w="100%"
      bg={colorMode === "light" ? "#f6f5f5" : "dark"}
      color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
      border={`1px solid ${
        colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#cedada"
      }`}
    >
      <Icon as={FcGoogle} mr=".5rem" />
      {children}
    </Button>
  );
};

export default GoogleButton;
