"use client";

import {
  Stack,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { avatars } from "./utils/constants";

export default function FormLeftContent() {
  return (
    <Flex
      gap={{ base: 8, md: "2.5rem", lg: "4rem" }}
      direction={"column"}
      w={{ base: "100%", md: "45%" }}
    >
      <Heading
        lineHeight={1.4}
        fontSize={{
          base: "1.8rem",
          sm: "2rem",
          md: "2.3rem",
          lg: "2.5rem",
        }}
        fontWeight={600}
        letterSpacing={".1rem"}
      >
        Unleash the Power of Words, Connect with Like-minded Readers and Writers
      </Heading>
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
  );
}
