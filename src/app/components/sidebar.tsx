"use client";
import React, { ReactNode, useContext } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Input,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiTrendingUp,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import { BsLayoutWtf, BsBookmarks, BsPerson } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { MdOutlineDrafts, MdOutlineAnalytics } from "react-icons/md";
import { IconType } from "react-icons";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useAuth, useLogout } from "../hooks/auth";
import NextLink from "next/link";
import { BlogContext } from "../../../context/blog-context";
import NavProfile from "./navbar-profile";

interface LinkItemProps {
  name: string;
  icon?: IconType;
  children?: { subIcon?: IconType; subName?: string; href?: string }[];
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: "Overview",
    children: [
      {
        subIcon: BsLayoutWtf,
        subName: "Feed",
        href: "/pages/dashboard",
      },
      {
        subIcon: BsBookmarks,
        subName: "Bookmarks",
      },
      {
        subIcon: AiOutlineTeam,
        subName: "Team blogs",
      },
      {
        subIcon: MdOutlineDrafts,
        subName: "Drafts",
      },
      {
        subIcon: MdOutlineAnalytics,
        subName: "Analytics",
        href: "/pages/dashboard/analytics",
      },
    ],
  },
  {
    name: "Trending Tags",
    icon: FiTrendingUp,
    children: [
      {
        subName: "Programming",
      },
      {
        subName: "Data science",
      },
      {
        subName: "Technology ",
      },
      {
        subName: "Machine learning",
      },
      {
        subName: "Politics",
      },
    ],
  },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent bg={colorMode === "light" ? "#fff" : "#171923"}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { colorMode } = useColorMode();
  // const router = useRouter();
  const { logout, isLoading } = useLogout();

  return (
    <Box
      transition="3s ease"
      bg={colorMode === "dark" ? "light" : "dark"}
      color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      overflow={"auto"}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link
          href="/"
          textAlign={{ base: "center", md: "left" }}
          color="#543EE0"
          fontWeight={700}
          fontSize="1.4rem"
          _hover={{
            textDecoration: "none",
          }}
        >
          CHATTER
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((item, index) => (
        <Flex direction={"column"} key={index} mb="3rem" ml="2rem">
          <Flex align={"center"} gap=".5rem">
            <Text color={colorMode === "dark" ? "#f5f6f6" : "#000"}>
              {item.name}
            </Text>
            {item.icon && <Icon as={item.icon} />}
          </Flex>
          {item.children && item.children.length > 0 && (
            <Flex direction={"column"} ml="1.7rem">
              {item.children?.map((child, childIndex) => (
                <Link key={childIndex} href={child.href} color="transparent">
                  <Flex
                    gap=".5rem"
                    mt="1.2rem"
                    align={"center"}
                    fontSize={".94rem"}
                  >
                    {child.subIcon && (
                      <Icon
                        as={child.subIcon}
                        color={colorMode === "dark" ? "#d0d0d0" : "#626262"}
                      />
                    )}
                    <Text color={colorMode === "dark" ? "#d0d0d0" : "#626262"}>
                      {child.subName}
                    </Text>
                  </Flex>
                </Link>
              ))}
            </Flex>
          )}
        </Flex>
      ))}
      <Flex
        as={Button}
        color="red"
        isLoading={isLoading}
        ml="2rem"
        align={"center"}
        gap=".5rem"
        cursor={"pointer"}
        onClick={logout}
      >
        Log out
        <FiLogOut />
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAuth();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: "2rem" }}
      height={20}
      alignItems="center"
      bg={colorMode === "dark" ? "light" : "dark"}
      color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between"
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Input
        display={{ base: "none", md: "block" }}
        w="20rem"
        placeholder="Search...."
        borderColor={useColorModeValue("gray.300", "gray.400")}
        borderRadius="5px"
        focusBorderColor="none"
        ml={{ base: "1rem", md: "0rem" }}
        mr={{ base: "0rem", md: "1rem" }}
      />
      <Button
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
        _focus={{ boxShadow: "none" }}
        w="fit-content"
      >
        {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
      </Button>
      <HStack spacing={{ base: "0", md: "2" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <NavProfile />
        </Flex>
      </HStack>
    </Flex>
  );
};
