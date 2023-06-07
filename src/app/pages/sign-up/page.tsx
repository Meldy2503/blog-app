"use client";
import React from "react";
import NextLink from "next/link";
import {
  Box,
  Link,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  HStack,
  Flex,
  VStack,
  Icon,
} from "@chakra-ui/react";
import Wrapper from "../../components/wrapper/page";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const SignUp = () => {
  return (
    <Flex>
      <Box
        w="50%"
        bgImage="/assets/signup.jpg"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      />
      <Box w="50%">
        <Box w="70%" m="auto" py="2rem">
          <Flex justify="between" align="center" mb="1rem">
            <Link as={NextLink} href="/pages/sign-up" w="50%">
              REGISTER
            </Link>
            <Link as={NextLink} href="/pages/sign-in" w="50%" textAlign="end">
              LOG IN
            </Link>
          </Flex>
          <Heading as="h4" fontSize="1.4rem" my="1.5rem" textAlign="center">
            Register as a Writer/Reader
          </Heading>
          <form>
            <HStack>
              <FormControl mb="1rem">
                <FormLabel>First name</FormLabel>
                <Input placeholder="First name" />
              </FormControl>
              <FormControl mb="1rem">
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Last name" />
              </FormControl>
            </HStack>
            <FormControl mb="1rem">
              <FormLabel>You are joining as?</FormLabel>
              <Select placeholder="Writer">
                <option>Writer</option>
                <option>Reader</option>
              </Select>
            </FormControl>
            <FormControl mb="1rem">
              <FormLabel>Email</FormLabel>
              <Input placeholder="marysmith@gmail.com" />
            </FormControl>
            <FormControl mb="1rem">
              <FormLabel>Password</FormLabel>
              {/* <Icon as={FiEye} /> */}
              <Input placeholder="********" />
            </FormControl>
            <FormControl mb="1rem">
              <FormLabel>Confirm Password</FormLabel>

              <Input placeholder="********" />
            </FormControl>
            <Button type="submit" w="100%" mt=".2rem" bg="#543EE0" color="#fff">
              Create Account
            </Button>
          </form>
          <VStack gap="1.2rem" mt="1.2rem">
            <Button type="submit" w="100%">
              <Icon as={FcGoogle} mr=".5rem" />
              Sign up with google
            </Button>
            <Button type="submit" w="100%">
              <Icon as={FaLinkedin} color="#0072b1" mr=".5rem" />
              Sign up with Linkedin
            </Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignUp;
