import React from "react";
import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  Avatar,
  Flex,
} from "@chakra-ui/react";

const EditProfileModal = () => {
  const { onClose } = useDisclosure();

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>My Profile</ModalHeader>
        <ModalCloseButton />
        <Flex
          justify={"center"}
          align={"center"}
          direction="column"
          m="auto"
          gap="1rem"
          pb="1rem"
        >
          <Avatar
            name="Emelder Okafor"
            size={"2xl"}
            border={"5px solid #1f222f"}
            src="https://bit.ly/dan-abramov"
          />
          <FormControl>
            <Input type="file" placeholder="Change image" border="none" />
          </FormControl>
        </Flex>
        <ModalBody pb={6}>
          <FormControl mb="1.5rem">
            <FormLabel>First name</FormLabel>
            <Input placeholder="First name" />
          </FormControl>
          <FormControl mb="1.5rem">
            <FormLabel>Last name</FormLabel>
            <Input placeholder="Last name" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default EditProfileModal;
