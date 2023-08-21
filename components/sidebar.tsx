"use client";
import React, { ReactNode, useContext } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
  useColorMode,
  Skeleton,
} from "@chakra-ui/react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { useAuth, useLogout } from "../hooks/auth";
import Link from "next/link";
import NavProfile from "./navbar-profile";
import { usePathname } from "next/navigation";
import { LinkItems } from "./utils/constants";
import SearchBar from "./search-bar";
import { usePosts } from "../hooks/posts";
import { FiTrendingUp } from "react-icons/fi";
import { capitalizeName } from "./utils/functions";
import { ListSkeleton } from "./utils/skeleton";
import { BlogContext } from "../context/blog-context";

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { currentUser } = useContext(BlogContext);
  const { user, authUser } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      {authUser && (
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
      )}
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { colorMode } = useColorMode();
  const currentRoute = usePathname();
  const { logout, isLoading } = useLogout();
  const { posts, isLoading: postLoading } = usePosts();

  const activeColor = colorMode === "dark" ? "#d0d0d0" : "#626262";

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
        <Link href="/">
          <Box
            textAlign={{ base: "center", md: "left" }}
            color="#543EE0"
            fontWeight={700}
            fontSize="1.4rem"
            _hover={{
              textDecoration: "none",
            }}
          >
            CHATTER
          </Box>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((item, index) => (
        <Flex direction={"column"} key={index} mb="2rem" ml="2rem">
          <Flex align={"center"} gap=".5rem">
            <Text color={colorMode === "dark" ? "#f5f6f6" : "#000"}>
              {item.name}
            </Text>
            {item.icon && <Icon as={item.icon} />}
          </Flex>
          {item.children && item.children.length > 0 && (
            <Flex direction={"column"} ml="1rem">
              {item.children?.map((child, childIndex) => (
                <Link key={childIndex} href={child.href ?? "#"}>
                  <Box width={"fit-content"} transition={"0.3s ease"}>
                    <Flex
                      borderRadius={"md"}
                      bg={currentRoute === child.href ? "brand.600" : "none"}
                      gap=".5rem"
                      mt=".5rem"
                      px={"12px"}
                      py={"8px"}
                      align={"center"}
                      fontSize={".94rem"}
                    >
                      {child.subIcon && (
                        <Icon
                          as={child.subIcon}
                          color={
                            currentRoute === child.href ? "#fff" : activeColor
                          }
                        />
                      )}

                      <Text
                        color={
                          currentRoute === child.href ? "#fff" : activeColor
                        }
                      >
                        {child.subName}
                      </Text>
                    </Flex>
                  </Box>
                </Link>
              ))}
            </Flex>
          )}
          <Flex mt="1.5rem" align="center" gap=".5rem">
            <Text>Trending Tags</Text>
            <Icon as={FiTrendingUp} />
          </Flex>
          {postLoading && <ListSkeleton />}
          {Array.from(
            new Set(posts?.slice(0, 7).map((post) => post?.category))
          ).map((item) => {
            return (
              <Box key={item}>
                <Box pl="2rem" fontSize="1rem" mt="1rem">
                  <Link href={`/dashboard/category/${item}`}>
                    {capitalizeName(item)}
                  </Link>
                </Box>
              </Box>
            );
          })}
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

      <SearchBar w={{ base: "10rem", sm: "18rem" }} />

      <Button
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
        _focus={{ boxShadow: "none" }}
        w="fit-content"
      >
        {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
      </Button>

      <Flex alignItems={"center"}>
        <NavProfile />
      </Flex>
    </Flex>
  );
};
