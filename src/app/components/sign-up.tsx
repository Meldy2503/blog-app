"use client";

import React, { useEffect } from "react";
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
import { FaLinkedin } from "react-icons/fa";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useForm } from "react-hook-form";
import {
  emailValidate,
  firstNameValidate,
  lastNameValidate,
  passwordValidate,
} from "./utils/form.-validate";
import { FiEye } from "react-icons/fi";
import { RiEyeCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SuccessToast, ErrorToast } from "./utils/toast";

interface SignUpForm {
  firstName: string;
  lastName: string;
  joiningAs: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [createUserWithEmailAndPassword, user, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoader, error] =
    useSignInWithGoogle(auth);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = async (data: SignUpForm) => {
    createUserWithEmailAndPassword(data.email, data.password);
  };

  useEffect(() => {
    if (user || googleUser) {
      router.push("/pages/dashboard");
      SuccessToast("Account created successful!");
    }

    if (authError || error) {
      ErrorToast("User already exists!");
    }
  }, [user, googleUser, authError, error, router]);

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
        Register as a Writer/Reader
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <FormControl mb="1rem">
            <FormLabel>First name</FormLabel>
            <Input
              placeholder="First name"
              focusBorderColor="none"
              {...register("firstName", firstNameValidate)}
            />
            {errors.firstName && (
              <Text color="red" fontSize=".8rem" mt=".2rem">
                {errors.firstName.message}
              </Text>
            )}
          </FormControl>
          <FormControl mb="1rem">
            <FormLabel>Last name</FormLabel>
            <Input
              placeholder="Last name"
              focusBorderColor="none"
              {...register("lastName", lastNameValidate)}
            />
            {errors.lastName && (
              <Text color="red" fontSize=".8rem" mt=".2rem">
                {errors.lastName.message}
              </Text>
            )}
          </FormControl>
        </Stack>
        <FormControl mb="1rem">
          <FormLabel>You are joining as?</FormLabel>
          <Select focusBorderColor="none">
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
          isLoading={loading}
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
          onClick={() => signInWithGoogle()}
          w="100%"
          isLoading={googleLoader}
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
