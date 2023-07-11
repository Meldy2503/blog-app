import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { uuidv4 } from "@firebase/util";
import { ErrorToast, SuccessToast } from "../components/utils/toast";

interface ToggleLikeProps {
  email: string;
  isLiked: boolean;
  id: string;
}

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

export function useDeletePost(id: string) {
  const [isLoading, setLoading] = useState(false);

  async function deletePost() {
    const res = window.confirm("Are you sure you want to delete this post?");

    if (res) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "articles", id));

      // Delete comments
      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

      SuccessToast("Post deleted!");

      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}
