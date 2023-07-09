/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useContext, useEffect, useState } from "react";
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
  Text,
  Flex,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { emailValidate, passwordValidate } from "./utils/form.-validate";
import { useRouter } from "next/navigation";
import { FiEye } from "react-icons/fi";
import { RiEyeCloseLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { SuccessToast } from "./utils/toast";
import { useLogin } from "../hooks/auth";
import { BlogContext } from "../context/blog-context";

interface SignInForm {
  email: string;
  password: string;
}

export default function LogIn() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { handleUserAuth, currentUser } = useContext(BlogContext);
  const { login: userlogin, isLoading } = useLogin();
  const [isMounted, setIsMounted] = useState(false);

  const { colorMode } = useColorMode();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  async function handleLogin(data: SignInForm) {
    const succeeded = await userlogin({
      email: data.email,
      password: data.password,
      redirectTo: "/dashboard",
    });
    if (succeeded) console.log("Login successfull");
  }

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
      SuccessToast("Login Successful!");
    }
  }, [currentUser, router]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  return (
    <Box color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}>
      {isMounted && (
        <>
          <Heading
            as="h4"
            fontSize="1.4rem"
            mb="1.5rem"
            color={colorMode === "dark" ? "#d0d0d0" : "black"}
          >
            Sign in
          </Heading>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl mb="2rem">
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
              w="100%"
              isLoading={isLoading}
              mt=".2rem"
              bg="#543ee0"
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
              onClick={handleUserAuth}
              w="100%"
              bg={colorMode === "light" ? "#f6f5f5" : "dark"}
              color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
              border={`1px solid ${
                colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#cedada"
              }`}
            >
              <Icon as={FcGoogle} mr=".5rem" />
              Sign in with google
            </Button>

            <Flex mt="2rem" gap=".5rem">
              <Text>Don't have an account? </Text>
              <Link href="/auth/sign-up">
                <Text color="#543EE0" textDecoration={"underline"}>
                  Sign up
                </Text>
              </Link>
            </Flex>
          </VStack>
        </>
      )}
    </Box>
  );
}