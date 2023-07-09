"use client";
import React, { createContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../hooks/auth";

export const BlogContext = createContext<{
  posts: Posts[];
  users: Users[];
  currentUser: null | any;
  handleUserAuth: React.Dispatch<React.SetStateAction<Users | any>>;
  entry: Entry | any;
  setEntry: React.Dispatch<React.SetStateAction<Entry>>;
}>({
  posts: [],
  users: [],
  handleUserAuth: () => {},
  setEntry: () => [],
  currentUser: null,
  entry: {
    author: "",
    brief: "",
    body: "",
    category: "",
    postedOn: serverTimestamp(),
    title: "",
    bannerImage: "",
    postLength: 0,
  },
});

export interface Users {
  id: string;
  data: {
    email: string;
    followerCount?: string;
    imageUrl?: string;
    name: string;
    joiningAs?: string;
    occupation?: string;
    username?: string;
    joinedOn?: any;
  };
}
export interface Posts {
  id: string;
  data: {
    author: string;
    brief?: string;
    body: string;
    category?: string;
    title?: string;
    postedOn?: any;
    likes?: string[];
    bannerImage: string;
    postLength?: number;
  };
}

export interface Entry {
  author?: string;
  brief?: string;
  body: string;
  category?: string;
  postedOn?: any;
  title: string;
  bannerImage?: string;
  postLength: number;
}

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Posts[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [entry, setEntry] = useState<Entry>({
    author: "",
    title: "",
    brief: "",
    bannerImage: "",
    category: "",
    body: "",
    postedOn: serverTimestamp(),
    postLength: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: {
            email: doc.data().email,
            followerCount: doc.data().followerCount,
            imageUrl: doc.data().imageUrl,
            name: doc.data().name,
            joiningAs: doc.data().joiningAs,
            username: doc.data().username,
            occupation: doc.data().occupation,
            joinedOn: doc.data().joinedOn,
          },
        };
      });
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "articles");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: {
            brief: doc.data().brief,
            author: doc.data().author,
            body: doc.data().body,
            category: doc.data().category,
            likes: doc.data().likes,
            title: doc.data().title,
            postedOn: doc.data().postedOn.toDate(),
            bannerImage: doc.data().bannerImage,
            postLength: doc.data().postLength,
          },
        };
      });
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  const addUserToFirebase = async (user: any) => {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      followerCount: 0,
      imageUrl: user.photoURL,
      name: user.displayName,
      joiningAs: "writer",
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
        posts,
        users,
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
