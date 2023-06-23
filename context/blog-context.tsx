"use client";
import React, { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import firebase from "firebase/app";

export const BlogContext = createContext({
  posts: [] as Posts[],
  users: [] as Users[],
});

export interface Users {
  id: string;
  data: { [x: string]: any };
}
export interface Posts {
  id: string;
  data: {
    title: string;
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

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: {
            ...doc.data(),
          },
        };
      });
      console.log(usersList);
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
            title: doc.data().title,
            brief: doc.data().brief,
            body: doc.data().body,
            category: doc.data().category,
            postedOn: doc.data().postedOn.toDate(),
            bannerImage: doc.data().bannerImage,
            postLength: doc.data().postLength,
          },
        };
      });
      setPosts(postsList);
      console.log(postsList);
    };

    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider value={{ posts, users }}>
      {children}
    </BlogContext.Provider>
  );
};
