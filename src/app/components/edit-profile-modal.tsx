import React, { useState, useEffect } from "react";
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
  Modal,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { ErrorToast, SuccessToast } from "./utils/toast";
import Link from "next/link";

const EditProfileModal = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { user } = useAuth();
  const [editUser, setEditUser] = useState(user);

  const capitalizedName = user?.name?.replace(/\b\w/g, (letter: any) =>
    letter.toUpperCase()
  );

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      setName(capitalizedName || "");
      setUsername(user.username || "");
    }
  }, [capitalizedName, user]);

  const handleUserEdit = async () => {
    try {
      const userRef = doc(db, "users", user?.id);
      await updateDoc(userRef, {
        name,
        username,
      });
      setEditUser({
        ...editUser,
        name,
        username,
      });
      SuccessToast("Profile updated successfully!");
      onClose();
      window.location.reload(); // Refresh the page
    } catch (error) {
      ErrorToast("Error updating user profile");
    }
  };

  console.log(editUser, "++++>>");
  console.log(user, "======>>");

  return (
    <>
      <Flex gap={"1.5rem"}>
        <Button onClick={onOpen} colorScheme="blue">
          Edit
        </Button>
        <Button>
          <Link href="/pages/dashboard">Go Back</Link>
        </Button>
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay bgGradient="linear(to-l,rgb(0, 0, 0, 0.4),rgb(0, 0, 0, 0.4))" />
        <ModalContent>
          <ModalHeader>My Profile</ModalHeader>
          <ModalCloseButton />
          <Flex
            justify="center"
            align="center"
            direction="column"
            m="auto"
            gap="1rem"
            pb="1rem"
          >
            <Avatar
              name="Emelder Okafor"
              size="2xl"
              border="5px solid #1f222f"
              src="https://bit.ly/dan-abramov"
            />
            <FormControl>
              <Input type="file" placeholder="Change image" border="none" />
            </FormControl>
          </Flex>
          <ModalBody pb={6}>
            <FormControl mb="1rem">
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl mb="1rem">
              <FormLabel>Email</FormLabel>
              <Input isDisabled placeholder="Email" value={user?.email} />
            </FormControl>
            <FormControl mb="1rem">
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUserEdit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
