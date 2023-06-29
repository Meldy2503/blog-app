import React from "react";
import { Flex, useColorMode, Button } from "@chakra-ui/react";
import Link from "next/link";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";

const UserNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      justify={"center"}
      align="center"
      h="3.5rem"
      fontWeight={700}
      fontSize="1.6rem"
      _hover={{
        textDecoration: "none",
      }}
      gap="2rem"
      shadow="lg"
      color="#543EE0"
      borderBottom={`1px solid ${
        colorMode === "dark" ? "rgb(255, 255, 255, .1)" : "#d0d0d0"
      }`}
    >
      <Link href="/">CHATTER</Link>
      <Button
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
        _focus={{ boxShadow: "none" }}
        w="fit-content"
      >
        {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
      </Button>
    </Flex>
  );
};

export default UserNav;
