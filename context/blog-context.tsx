"use client";
import React, { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";

import firebase from "firebase/app";

export const BlogContext = createContext({
  posts: [] as Posts[],
  users: [] as Users[],
  post: null as Posts | any,
  setPost: null as unknown as React.Dispatch<React.SetStateAction<Posts | any>>,
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
  };
}
export interface Posts {
  id: string;
  data: {
    author: string;
    brief?: string;
    body: string;
    category?: string;
    postedOn?: any;
    // postedOn?: firebase.firestore.Timestamp;
    bannerImage: string;
    postLength?: number;
  };
}

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [post, setPost] = useState<Posts | any>([]);

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

  return (
    <BlogContext.Provider value={{ posts, users, post, setPost }}>
      {children}
    </BlogContext.Provider>
  );
};
