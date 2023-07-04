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
import { db, storage } from "../../../firebase";
import { ErrorToast, SuccessToast } from "./utils/toast";
import Link from "next/link";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";

const EditProfileModal = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { user } = useAuth();
  const [editUser, setEditUser] = useState(user);
  const router = useRouter();

  const capitalizedName = user?.name?.replace(/\b\w/g, (letter: any) =>
    letter.toUpperCase()
  );

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [profilePictureURL, setProfilePictureURL] = useState("");

  useEffect(() => {
    if (user) {
      setName(capitalizedName || "");
      setUsername(user.username || "");
    }
  }, [capitalizedName, user]);

  const handleGoBack = () => {
    router.back();
  };

  // const handleProfilePictureChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setProfilePicture(file);

  //     const reader = new FileReader();
  //     reader.onload = (e: ProgressEvent<FileReader>) => {
  //       setProfilePictureURL(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleProfilePictureChange = (event: any) => {
    setProfilePicture(event.target.files[0]);
  };

  // const handleProfilePictureChange = async () => {
  //   try {
  //     const userRef = doc(db, "users", user?.id);

  //     // If a new profile picture is selected, upload it to Firebase Storage
  //     if (profilePicture) {
  //       const storageRef = ref(storage, `profilePictures/${user?.id}`);
  //       await uploadBytes(storageRef, profilePicture);
  //       const downloadURL = await getDownloadURL(storageRef);

  //       // Update the user document with the new profile picture URL
  //       await updateDoc(userRef, {
  //         profilePictureURL: downloadURL,
  //       });
  //     }

  //     // Update other profile information
  //     await updateDoc(userRef, {
  //       name,
  //       username,
  //     });

  //     setEditUser({
  //       ...editUser,
  //       name,
  //       username,
  //       profilePictureURL: profilePictureURL || editUser.profilePictureURL,
  //     });
  //     SuccessToast("Profile updated successfully!");
  //     onClose(); // Close the modal
  //     window.location.reload(); // Refresh the page
  //     queryClient.invalidateQueries("user"); // Invalidate the "user" query
  //   } catch (error) {
  //     ErrorToast("Error updating user profile");
  //   }
  // };

  const handleUserEdit = () => {
    if (profilePicture === null) return;

    if (profilePicture) {
      const imageRef = ref(storage, `profilePicture/${user?.id}`);
      uploadBytes(imageRef, profilePicture).then(() => {
        console.log("Upload a file!");
      });
    }
    // const downloadURL = getDownloadURL(imageRef);
    // return downloadURL;
  };

  // const handleUserEdit = async () => {
  //   try {
  //     const userRef = doc(db, "users", user?.id);
  //     await updateDoc(userRef, {
  //       name,
  //       username,
  //     });
  //     setEditUser({
  //       ...editUser,
  //       name,
  //       username,
  //     });
  //     SuccessToast("Profile updated successfully!");
  //     onClose();
  //     window.location.reload(); // Refresh the page
  //   } catch (error) {
  //     ErrorToast("Error updating user profile");
  //   }
  // };

  console.log(editUser, "++++>>");
  console.log(user, "======>>");

  return (
    <>
      <Flex gap={"1.5rem"}>
        <Button onClick={onOpen} colorScheme="blue">
          Edit
        </Button>
        <Button onClick={handleGoBack}>Go Back</Button>
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
              name={name}
              size="2xl"
              border="5px solid #1f222f"
              src={editUser?.profilePicture}
              // src="https://bit.ly/dan-abramov"
            />
            <FormControl>
              <Input
                type="file"
                placeholder="Change image"
                onChange={handleProfilePictureChange}
                border="none"
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
