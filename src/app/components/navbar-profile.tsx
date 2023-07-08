import React from "react";
import {
  Box,
  Flex,
  Text,
  useColorMode,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Menu,
  MenuButton,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import NextLink from "next/link";
import { useAuth, useLogout } from "../hooks/auth";

const NavProfile = () => {
  const { user } = useAuth();
  const { logout } = useLogout();
  const { colorMode } = useColorMode();
  const capitalizedName = user?.name?.replace(/\b\w/g, (letter: any) =>
    letter.toUpperCase()
  );
  return (
    <Box zIndex="100">
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            <Avatar size={"sm"} src={user?.imageUrl} name={capitalizedName} />

            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={colorMode === "light" ? "#fff" : "#171923"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Flex
            align={"center"}
            direction={"column"}
            justify={"center"}
            gap=".5rem"
            mb="1rem"
          >
            <Avatar size={"lg"} src={user?.imageUrl} name={capitalizedName} />
            <Text fontSize={".85rem"}>{capitalizedName}</Text>
          </Flex>
          <MenuItem
            as={NextLink}
            href={`/pages/profile/${user?.email}`}
            fontWeight={"normal"}
          >
            Profile
          </MenuItem>
          <MenuDivider />
          <MenuItem
            as={NextLink}
            href={"/pages/dashboard"}
            fontWeight={"normal"}
          >
            Dashboard
          </MenuItem>

          <MenuDivider />
          <MenuItem onClick={logout}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default NavProfile;
