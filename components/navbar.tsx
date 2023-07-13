import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { useAuth } from "../hooks/auth";
import NavProfile from "./navbar-profile";
import { FaPencilAlt } from "react-icons/fa";
import Link from "next/link";
import { NAV_ITEMS, NavItem } from "./utils/constants";
import { usePathname } from "next/navigation";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { user, isLoading } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      borderBottom={1}
      borderStyle={"solid"}
      border={`1px solid ${
        colorMode === "dark" ? "rgb(255, 255, 255, .1)" : "#d0d0d0"
      }`}
      color={colorMode === "dark" ? "#d0d0d0" : "#2b2b2b"}
      bg={colorMode === "dark" ? "#1a202c" : "#fff"}
      zIndex={10}
    >
      <Box maxW="1100px" m="auto" w={{ base: "95%", md: "90%" }}>
        <Flex fontWeight={700} py={{ base: 2, md: 4 }} align={"center"}>
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <AiOutlineClose /> : <FiMenu />}
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center", md: "start" }}
            align={"center"}
          >
            <Box
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontWeight={700}
              fontSize="1.4rem"
              color="#543EE0"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Link href="/">CHATTER</Link>
            </Box>

            <Flex display={{ base: "none", md: "flex" }} ml={14}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={{ base: 2, md: 6 }}
          >
            <Button
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              _focus={{ boxShadow: "none" }}
              w="fit-content"
            >
              {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
            </Button>

            <Link href={user ? "/dashboard/write-post" : "/auth/sign-in"}>
              <Box
                fontSize={"sm"}
                px="1rem"
                py=".5rem"
                borderRadius="5px"
                color={"white"}
                bg="#543EE0"
                border="2px solid #543EE0"
                display={{ base: "none", md: "inline-flex" }}
                fontWeight={600}
                _hover={{
                  textDecor: "none",
                }}
              >
                <Icon as={FaPencilAlt} color="#fff" mr=".5rem" />
                Write
              </Box>
            </Link>

            {isLoading ? null : (
              <>
                {user ? (
                  <NavProfile />
                ) : (
                  <Link href="/auth/sign-in">
                    <Button
                      fontSize={"sm"}
                      fontWeight={600}
                      bg="transparent"
                      color={colorMode === "dark" ? "white" : "#111"}
                      border="2px solid #543EE0"
                      _hover={{
                        bg: "#543EE0",
                        color: "#ffffff",
                      }}
                    >
                      Sign in
                    </Button>
                  </Link>
                )}
              </>
            )}
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </Box>
  );
}

const DesktopNav = () => {
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const currentRoute = usePathname();

  return (
    <Stack direction={"row"} spacing={4} zIndex={10}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                px={2}
                py={1}
                fontSize={"sm"}
                color={currentRoute === navItem.href ? "#543EE0" : "default"}
                borderBottom={
                  currentRoute === navItem.href ? "2px solid #543EE0" : "none"
                }
                fontWeight={600}
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Link
                  href={navItem.href ?? "#"}
                  color={currentRoute === navItem.href ? "default" : "#543EE0"}
                >
                  {navItem.label}
                </Link>
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                w="fit-content"
                mt="1rem"
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Stack
      direction={"row"}
      align={"center"}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("#543ee010", "gray.900") }}
      zIndex={10}
    >
      <Link href={href ?? "#"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "#543EE0" }}
            fontWeight={600}
          >
            {label}
          </Text>
          <Text fontSize={"sm"} fontWeight={500}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
          bg="red"
        ></Flex>
      </Link>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle} zIndex={10}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};
