import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  orderBy,
  query,
  collection,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { uuidv4 } from "@firebase/util";

interface ToggleBookmarkProps {
  email: string;
  isBookmarked: boolean;
  id: string;
}

export function useToggleBookmark({
  id,
  isBookmarked,
  email,
}: ToggleBookmarkProps) {
  const [isLoading, setLoading] = useState(false);

  async function toggleBookmark() {
    setLoading(true);

    const docRef = doc(db, "articles", id);
    await updateDoc(docRef, {
      bookmarks: isBookmarked ? arrayRemove(email) : arrayUnion(email),
    });

    const bkId = uuidv4();
    const bookmarkDocRef = doc(db, "bookmarks", bkId);
    if (isBookmarked) {
      // Delete the bookmark document if the post is unbookmarked
      await deleteDoc(bookmarkDocRef);
    } else {
      // Create/update the bookmark document if the post is bookmarked
      const bookmarkData = { postId: id, email, bkId, date: Date.now() };
      await setDoc(bookmarkDocRef, bookmarkData, { merge: true });
    }

    setLoading(false);
  }

  return { toggleBookmark, isLoading };
}

// to fetch bookmarked post(s) of a user
export function useBookmarkedPosts(email: string | null = null) {
  const q = query(
    collection(db, "bookmarks"),
    where("email", "==", email),
    orderBy("date", "desc")
  );

  const [userBookmarks, isLoading, error] = useCollectionData(q);
  if (error) throw error;

  return { userBookmarks, isLoading };
}
