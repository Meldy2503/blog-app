"use client";

import React, { useContext, useEffect } from "react";
import {
  Stack,
  Heading,
  Select,
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
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useForm } from "react-hook-form";
import {
  emailValidate,
  nameValidate,
  passwordValidate,
  usernameValidate,
} from "./utils/form.-validate";
import { FiEye } from "react-icons/fi";
import { RiEyeCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SuccessToast, ErrorToast } from "./utils/toast";
import { useRegister } from "../hooks/auth";
import { BlogContext } from "../../../context/blog-context";

interface SignUpForm {
  name: string;
  joiningAs: string;
  email: string;
  username: string;
  password: string;
}

export default function SignUp() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { handleUserAuth, currentUser } = useContext(BlogContext);
  const { register: signup, isLoading } = useRegister();

  const router = useRouter();

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
      joiningAs: data.joiningAs,
      username: data.username,
      redirectTo: "/pages/auth/sign-in",
    });
  }

  useEffect(() => {
    if (currentUser) {
      router.push("/pages/dashboard");
      SuccessToast("Login Successful!");
    }
  }, [currentUser, router]);

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
        <Stack direction={{ base: "column", lg: "row" }}>
          <FormControl mb="1rem">
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
        </Stack>
        <FormControl mb="1rem">
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
        <FormControl mb="1rem">
          <FormLabel>You are joining as?</FormLabel>
          <Select focusBorderColor="none" {...register("joiningAs")}>
            <option>Writer</option>
            <option>Reader</option>
          </Select>
        </FormControl>
        <FormControl mb="1rem">
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
        <FormControl mb="1rem">
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
          Sign up with google
        </Button>
        <Flex mt="2rem" gap=".5rem">
          <Text>Already have an account? </Text>
          <Link href="/pages/auth/sign-in">
            <Text color="#543EE0" textDecoration={"underline"}>
              Sign in
            </Text>
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
}
