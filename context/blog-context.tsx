"use client";
import React, { createContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export const BlogContext = createContext<{
  currentUser: null | any;
  handleUserAuth: React.Dispatch<React.SetStateAction<Users | any>>;
  entry: Entry | any;
  setEntry: React.Dispatch<React.SetStateAction<Entry>>;
}>({
  handleUserAuth: () => {},
  setEntry: () => [],
  currentUser: null,
  entry: {
    author: "",
    brief: "",
    body: "",
    category: "",
    postedOn: Date.now(),
    title: "",
    bannerImage: "",
    postLength: 0,
  },
});

export interface Users {
  id: string;
  email: string;
  followerCount?: string;
  imageUrl?: string;
  name: string;
  joiningAs?: string;
  occupation?: string;
  username?: string;
  joinedOn?: number | any;
  date?: number | any;
}
export interface Posts {
  id: string;
  author: string;
  brief?: string;
  body: string;
  category?: string;
  title?: string;
  postedOn?: any;
  likes?: string[];
  bannerImage: string;
  postLength?: number;
}

export interface Entry {
  author?: string;
  brief?: string;
  body: string;
  category?: string;
  postedOn?: any;
  title: string;
  bannerImage?: string | any;
  postLength: number;
}

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [entry, setEntry] = useState<Entry>({
    author: "",
    title: "",
    brief: "",
    bannerImage: "",
    category: "",
    body: "",
    postedOn: Date.now(),
    postLength: 0,
  });

  const addUserToFirebase = async (user: any) => {
    await setDoc(doc(db, "users", user?.email), {
      email: user.email,
      followerCount: 0,
      imageUrl: user.photoURL,
      name: user.displayName,
      username: user.displayName,
      occupation: "writer",
      joinedOn: Date.now(),
    });
  };

  const handleUserAuth = async () => {
    const userResponse = await signInWithPopup(auth, provider);
    const userData = userResponse.user;
    setCurrentUser(userData);
    addUserToFirebase(userData);
  };

  return (
    <BlogContext.Provider
      value={{
        currentUser,
        handleUserAuth,
        entry,
        setEntry,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
