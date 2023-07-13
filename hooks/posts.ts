import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../components/utils/toast";
import { uuidv4 } from "@firebase/util";
import { Posts } from "../context/blog-context";

// to fetch a single posts
export function usePost(id: string) {
  const q = doc(db, "articles", id);
  const [singlePost, isLoading] = useDocumentData(q);
  return { singlePost, isLoading };
}

// to fetch post(s) of a user
export function usePostsUid(author: string | null = null) {
  const q = query(
    collection(db, "articles"),
    orderBy("postedOn", "desc"),
    where("author", "==", author)
  );

  const [userPosts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { userPosts, isLoading };
}

// to fetch all posts
export function usePosts() {
  const q = query(collection(db, "articles"), orderBy("postedOn", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  async function addPost(post: Posts) {
    setLoading(true);
    try {
      const id = uuidv4();
      await setDoc(doc(db, "articles", id), {
        ...post,
        id,
        likes: [],
      });
      SuccessToast("Article Published Successfully!");
      router.push("/dashboard");
      window.location.reload();
    } catch (error: any) {
      ErrorToast("Error Publishing Article!");
    } finally {
      setLoading(false);
    }
  }

  return { addPost, isLoading };
}
