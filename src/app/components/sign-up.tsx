"use client";

import React from "react";
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

  const onSubmit = (data: SignUpForm) => {
    createUserWithEmailAndPassword(data.email, data.password);
    router.push("/pages/dashboard");
  };

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
          </FormControl>
          <FormControl mb="1rem">
            <FormLabel>Last name</FormLabel>
            <Input
              placeholder="Last name"
              focusBorderColor="none"
              {...register("lastName", lastNameValidate)}
            />
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
        </FormControl>{" "}
        <Button
          type="submit"
          isLoading={loading}
          w="100%"
          mt=".2rem"
          bg="#543EE0"
          color="#fff"
          _hover={{
            bg: "#4430c5",
          }}
        >
          Create Account
        </Button>
      </form>
      <VStack gap="1.2rem" mt="1rem">
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
      </VStack>
    </Box>
  );
}
