import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase";

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
