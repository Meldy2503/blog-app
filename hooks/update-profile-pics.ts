import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";

export function useUpdateAvatar(email: string) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function updateAvatar() {
    if (!file) {
      return;
    }

    try {
      setLoading(true);

      const fileRef = ref(storage, `profilePictures/${email}`);
      await uploadBytes(fileRef, file);

      const avatarURL = await getDownloadURL(fileRef);

      const docRef = doc(db, "users", email);
      await updateDoc(docRef, { imageUrl: avatarURL });
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    window.location.reload();
  }

  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}
