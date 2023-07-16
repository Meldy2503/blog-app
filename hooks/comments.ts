import {
  doc,
  collection,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { uuidv4 } from "@firebase/util";
import { ErrorToast, SuccessToast } from "../components/utils/toast";

export interface Comment {
  id?: string;
  text?: string;
  postID?: string;
  date?: number;
  email?: string;
}

export function useAddComment({
  postID,
  email,
}: {
  postID: string;
  email: string;
}) {
  const [isLoading, setLoading] = useState(false);

  async function addComment(text: string) {
    setLoading(true);
    try {
      const id = uuidv4();
      const date = Date.now();
      const docRef = doc(db, "comments", id);
      await setDoc(docRef, { text, id, postID, date, email });
      SuccessToast("Comment added!");
    } catch (error: any) {
      ErrorToast("An error occurred");
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
