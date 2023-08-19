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
import { db, storage } from "../firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../components/utils/toast";
import { uuidv4 } from "@firebase/util";
import { Posts } from "../context/blog-context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type FileURL = string | undefined;

// to fetch a single published-post/ draft-post
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

// to add a new created post
interface UseAddSavePostResult {
  isLoading: boolean;
  isDraftLoading: boolean;
  fileURL: FileURL;
  setFile: (file: File | null) => void;
  addSavePost: (post: Posts, isSave: boolean) => void;
}

export function useAddSavePost(): UseAddSavePostResult {
  const [isLoading, setLoading] = useState(false);
  const [isDraftLoading, setDraftLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function addSavePost(post: Posts, isSave: boolean) {
    isSave ? setDraftLoading(true) : setLoading(true);

    try {
      const id = uuidv4();
      if (file) {
        const fileRef = ref(storage, "bannerImg/" + Date.now());
        await uploadBytes(fileRef, file);
        const bannerURL = await getDownloadURL(fileRef);
        post.bannerImage = bannerURL;
      }

      await setDoc(doc(db, isSave ? "drafts" : "articles", id), {
        ...post,
        id,
        likes: [],
        bookmarks: [],
      });
      SuccessToast(
        isSave ? "Article Saved to Drafts!" : "Article Published Successfully!"
      );
    } catch (error: any) {
      ErrorToast(isSave ? "An error occurred" : "Error Publishing Article!");
    } finally {
      setLoading(false);
      setDraftLoading(false);
    }
  }

  const fileURL: FileURL = file ? URL.createObjectURL(file) : undefined;

  return {
    isLoading,
    isDraftLoading,
    fileURL,
    setFile,
    addSavePost,
  };
}

// to fetch posts based on category
export function usePostCategory(category: string) {
  const q = query(
    collection(db, "articles"),
    orderBy("postedOn", "desc"),
    where("category", "==", category)
  );
  const [postCategory, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { postCategory, isLoading };
}
