"use client";

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import PasswordInput from "./password-input";

export default function LogIn() {
  const { colorMode } = useColorMode();

  return (
    <Box color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}>
      <Heading
        as="h4"
        fontSize="1.4rem"
        mb="1.5rem"
        textAlign="center"
        color={colorMode === "dark" ? "#d0d0d0" : "black"}
      >
        Welcome back
      </Heading>
      <form>
        <FormControl mb="2rem">
          <FormLabel>Email</FormLabel>
          <Input placeholder="marysmith@gmail.com" focusBorderColor="none" />
        </FormControl>
        <PasswordInput />

        <Button
          type="submit"
          w="100%"
          mt=".2rem"
          bg="#543EE0"
          color="#fff"
          _hover={{
            bg: "#4430c5",
          }}
        >
          Log in{" "}
        </Button>
      </form>
      <VStack gap="1.2rem" mt="2rem">
        <Button
          type="submit"
          w="100%"
          bg={colorMode === "light" ? "#f6f5f5" : "dark"}
          color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
          border={`1px solid ${
            colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#cedada"
          }`}
        >
          <Icon as={FcGoogle} mr=".5rem" />
          Sign up with google
        </Button>
        <Button
          type="submit"
          border="1px solid #cedada"
          w="100%"
          bg={colorMode === "light" ? "#f6f5f5" : "dark"}
          color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
          border={`1px solid ${
            colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#cedada"
          }`}
        >
          <Icon as={FaLinkedin} color="#0072b1" mr=".5rem" />
          Sign up with Linkedin
        </Button>
      </VStack>
    </Box>
  );
}
