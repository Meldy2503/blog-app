"use client";
import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

interface Props {
  href: string;
  bg?: string;
  color?: string;
  hoverBg?: string;
  hoverColor?: string;
  children: React.ReactNode;
  w?: string;
}

const Button = ({
  href,
  bg,
  color,
  hoverBg,
  hoverColor,
  children,
  w,
}: Props) => {
  return (
    <Link
      as={NextLink}
      href={href}
      textAlign="center"
      fontSize=".92rem"
      px="1.1rem"
      py=".7rem"
      w={w}
      borderRadius=".3rem"
      bg={bg}
      color={color}
      fontWeight={600}
      _hover={{
        textDecoration: "none",
        bg: hoverBg,
        color: hoverColor,
      }}
    >
      {children}
    </Link>
  );
};

export default Button;
