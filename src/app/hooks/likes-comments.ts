import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  collection,
  deleteDoc,
  orderBy,
  query,
  setDoc,
  where,
  getDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase";
import { useToast } from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { uuidv4 } from "@firebase/util";

interface ToggleLikeProps {
  email: string;
  isLiked: boolean;
  id: string;
}

export interface Comment {
  id?: string;
  text?: string;
  postID?: string;
  date?: number;
  email?: string;
}
// for likes functionality
export function useToggleLike({ id, isLiked, email }: ToggleLikeProps) {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);

    const docRef = doc(db, "articles", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(email) : arrayUnion(email),
    });
    setLoading(false);
  }

  return { toggleLike, isLoading };
}

// add comments functionality
export function useAddComment({
  postID,
  email,
}: {
  postID: string;
  email: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addComment(text: string) {
    setLoading(true);
    try {
      const id = uuidv4();
      const date = Date.now();
      const docRef = doc(db, "comments", id);
      await setDoc(docRef, { text, id, postID, date, email });

      toast({
        title: "Comment added!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  return { addComment, isLoading };
}

export function useComments(postID: string) {
  const q = query(
    collection(db, "comments"),
    where("postID", "==", postID),
    orderBy("date", "asc")
  );
  const [comments, isLoading, error] = useCollectionData<Comment>(q);
  if (error) throw error;

  return { comments, isLoading };
}

// export function useDeleteComment(id: string) {
//   const [isLoading, setLoading] = useState(false);
//   const toast = useToast();

//   async function deleteComment() {

//     const res = window.confirm("Are you sure you want to delete this comment?");

//     if (res) {
//       setLoading(true);
//       const docRef = doc(db, "comments", id);
//       await deleteDoc(docRef);
//       toast({
//         title: "Comment deleted!",
//         status: "info",
//         isClosable: true,
//         position: "top",
//         duration: 5000,
//       });
//       setLoading(false);
//     }
//   }

//   return { deleteComment, isLoading };
// }
