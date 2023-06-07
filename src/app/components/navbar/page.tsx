import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
FiMenu;

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Box maxW="1200px" m="auto" w={{ base: "95%", md: "90%" }}>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color="#111111"
          fontWeight={700}
          py={{ base: 2 }}
          align={"center"}
        >
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
            <Link
              href="/"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              color="#543EE0"
              fontWeight={700}
              fontSize="1.6rem"
              _hover={{
                textDecoration: "none",
              }}
            >
              CHATTER
            </Link>

            <Flex display={{ base: "none", md: "flex" }} ml={14}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={{ base: 3, md: 6 }}
          >
            <Button
              as={"a"}
              fontSize={"sm"}
              variant={"link"}
              px="1.3rem"
              href="/pages/sign-up"
              border="2px solid #543EE0"
              display={{ base: "none", md: "inline-flex" }}
              textDecor={"none"}
              color="#111111"
              fontWeight={600}
              _hover={{
                bg: "#543EE0",
                color: "#ffffff",
              }}
            >
              Sign up
            </Button>
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg="#543EE0"
              border="2px solid #543EE0"
              href="/pages/sign-in"
              _hover={{
                bg: "transparent",
                color: "#111111",
              }}
            >
              Sign in
            </Button>
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
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                color="#111111"
                fontWeight={600}
                _hover={{
                  textDecoration: "none",
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                w="fit-content"
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
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("#543ee010", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
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
        ></Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
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

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    children: [
      {
        label: "Join our community",
        subLabel: "Be a part of our community today",
        href: "/",
      },
    ],
    href: "/",
  },
  {
    label: "About us",
    children: [
      {
        label: "Learn more about us",
        subLabel: "Discover who we are",
        href: "#",
      },
    ],
    href: "#",
  },
  {
    label: "Contact us",
    children: [
      {
        label: "We are here to help you",
        subLabel: "Reach out to us for any assistance",
        href: "#",
      },
    ],
    href: "#",
  },
  {
    label: "Blogs",
    children: [
      {
        label: "Read our latest blogs",
        subLabel: "Be updated with our latest blogs",
        href: "#",
      },
    ],
    href: "#",
  },
];
