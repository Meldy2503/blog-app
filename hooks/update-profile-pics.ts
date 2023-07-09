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

    setLoading(true);

    const fileRef = ref(storage, `profilePictures/${email}`);
    await uploadBytes(fileRef, file);

    const avatarURL = await getDownloadURL(fileRef);
    const docRef = doc(db, "users", email);
    await updateDoc(docRef, { imageUrl: avatarURL });

    setLoading(false);
  }

  return {
    setFile,
    updateAvatar,
    isLoading,
    file,
    fileURL: file && URL.createObjectURL(file),
  };
}
