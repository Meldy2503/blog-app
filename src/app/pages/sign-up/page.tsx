"use client";

import {
  Stack,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Box,
  Link,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Flex,
  VStack,
  Icon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { Blur } from "../../components/blur-icon";
import PasswordInput from "../../components/password-input";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

export default function JoinOurTeam() {
  return (
    <Box position={"relative"}>
      <Flex
        maxW={"1200px"}
        w={{ base: "95%", md: "90%" }}
        direction={{ base: "column", md: "row" }}
        py="2rem"
        m="auto"
        justify={"space-between"}
      >
        <Flex
          gap={{ base: 8, md: "2.5rem", lg: "4rem" }}
          direction={"column"}
          w={{ base: "100%", md: "45%" }}
        >
          <Heading
            bgGradient="linear(to-r, #543ee0, #333)"
            bgClip="text"
            fontSize={{ base: "2.3rem", md: "2.7rem", lg: "3rem" }}
            mt={{ base: "0", md: "3rem" }}
          >
            CHATTER
          </Heading>{" "}
          <Text
            lineHeight={1.2}
            fontSize={{
              base: "1.6rem",
              sm: "1.8rem",
              md: "2rem",
              lg: "2.3rem",
            }}
            fontWeight={600}
          >
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </Text>
          <Stack
            direction={{ base: "row", md: "column", lg: "row" }}
            spacing="0rem"
            align={"center"}
            justify={"flex-start"}
          >
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={{ base: "md", md: "lg" }}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, #543ee0,#543ee0)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,#b9811a7e)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Flex>
        <Stack
          bg={"gray.50"}
          border="1px solid #e2e8f0"
          rounded={"xl"}
          w={{ base: "100%", md: "50%" }}
          mt={{ base: "2rem", md: "0" }}
          p={{ base: 4, sm: 6 }}
          spacing={{ base: 8 }}
        >
          <Box py=".5rem">
            <Flex
              justify="between"
              align="center"
              mb="1rem"
              fontSize={".9rem"}
              fontWeight={600}
            >
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
              <Stack direction={{ base: "column", lg: "row" }}>
                <FormControl mb="1rem">
                  <FormLabel>First name</FormLabel>
                  <Input placeholder="First name" />
                </FormControl>
                <FormControl mb="1rem">
                  <FormLabel>Last name</FormLabel>
                  <Input placeholder="Last name" />
                </FormControl>
              </Stack>
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
              <PasswordInput />
              <Button
                type="submit"
                w="100%"
                mt=".2rem"
                bg="#543EE0"
                color="#fff"
              >
                Create Account
              </Button>
            </form>
            <VStack gap="1.2rem" mt="1rem">
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
        </Stack>
      </Flex>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(60px)" }}
      />
    </Box>
  );
}
