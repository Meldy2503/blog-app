"use client";

import React from "react";
import {
  Heading,
  Button,
  VStack,
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Icon,
  FormControl,
  FormLabel,
  useColorMode,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  emailValidate,
  nameValidate,
  passwordValidate,
  usernameValidate,
} from "./utils/form.-validate";
import { FiEye } from "react-icons/fi";
import { RiEyeCloseLine } from "react-icons/ri";
import Link from "next/link";
import { useRegister } from "../hooks/auth";
import GoogleButton from "./google-button";

interface SignUpForm {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default function SignUp() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { register: signup, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const { colorMode } = useColorMode();

  async function handleRegister(data: SignUpForm) {
    signup({
      email: data.email,
      password: data.password,
      name: data.name,
      username: data.username,
      redirectTo: "/auth/sign-in",
    });
  }

  return (
    <Box color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}>
      <Heading
        as="h4"
        fontSize="1.4rem"
        mb="1.5rem"
        textAlign="center"
        color={colorMode === "dark" ? "#d0d0d0" : "black"}
      >
        Register as a Writer/Reader
      </Heading>
      <form onSubmit={handleSubmit(handleRegister)}>
        <FormControl mb=".8rem">
          <FormLabel>Full name</FormLabel>
          <Input
            placeholder="Full name"
            focusBorderColor="none"
            {...register("name", nameValidate)}
          />
          {errors.name && (
            <Text color="red" fontSize=".8rem" mt=".2rem">
              {errors.name.message}
            </Text>
          )}
        </FormControl>
        <FormControl mb=".8rem">
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            focusBorderColor="none"
            {...register("username", usernameValidate)}
          />
          {errors.username && (
            <Text color="red" fontSize=".8rem" mt=".2rem">
              {errors.username.message}
            </Text>
          )}
        </FormControl>
        <FormControl mb=".8rem">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="marysmith@gmail.com"
            focusBorderColor="none"
            {...register("email", emailValidate)}
          />
          {errors.email && (
            <Text color="red" fontSize=".8rem" mt=".2rem">
              {errors.email.message}
            </Text>
          )}
        </FormControl>
        <FormControl mb=".8rem">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              focusBorderColor="none"
              {...register("password", passwordValidate)}
            />
            <InputRightElement>
              <Box onClick={handleClick}>
                {show ? <Icon as={FiEye} /> : <Icon as={RiEyeCloseLine} />}
              </Box>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Text color="red" fontSize=".8rem" mt=".2rem">
              {errors.password.message}
            </Text>
          )}
        </FormControl>{" "}
        <Button
          type="submit"
          isLoading={isLoading}
          w="100%"
          mt=".5rem"
          bg="#543EE0"
          color="#fff"
          _hover={{
            bg: "#4430c5",
          }}
        >
          Create Account
        </Button>
      </form>
      <VStack gap="1.2rem" mt="1.5rem">
        <GoogleButton>Sign up with google</GoogleButton>
        <Flex mt=".5rem" gap=".5rem">
          <Text>Already have an account? </Text>
          <Link href="/auth/sign-in">
            <Text color="#543EE0" textDecoration={"underline"}>
              Sign in
            </Text>
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
}
