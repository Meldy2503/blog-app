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
  useColorMode,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { ErrorToast, SuccessToast } from "./utils/toast";
import { useUpdateAvatar } from "../hooks/update-profile-pics";
import { capitalizeName } from "./utils/functions";

const EditProfileModal = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { colorMode } = useColorMode();
  const { user } = useAuth();
  const [editUser, setEditUser] = useState(user);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [occupation, setOccupation] = useState("");
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(user?.email);

  const capitalizedName = capitalizeName(user?.name);

  useEffect(() => {
    if (user) {
      setName(capitalizedName || "");
      setUsername(user?.username || "");
      setOccupation(user?.occupation || "");
    }
  }, [capitalizedName, user]);

  const handleUserEdit = async () => {
    try {
      updateAvatar();
      const userRef = doc(db, "users", user?.email);
      await updateDoc(userRef, {
        name,
        username,
        occupation,
      });
      setEditUser({
        ...editUser,
        name,
        username,
        occupation,
      });
      SuccessToast("Profile updated successfully!");
      onClose();
    } catch (error) {
      ErrorToast("Error updating user profile");
    }
  };

  const handleProfileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Edit
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay bgGradient="linear(to-l,rgb(0, 0, 0, 0.4),rgb(0, 0, 0, 0.4))" />
        <ModalContent color={colorMode === "light" ? "#111" : "#d0d0d0"}>
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
              name={name}
              size="2xl"
              border="5px solid #1f222f"
              src={fileURL ?? editUser?.profilePicture}
            />
            <FormControl>
              <Input
                type="file"
                border="none"
                onChange={handleProfileChange}
                accept="image/*"
              />
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
            <FormControl mb="1rem">
              <FormLabel>Occupation</FormLabel>
              <Input
                placeholder="Occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUserEdit}
              isLoading={fileLoading}
            >
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
