import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { Users } from "../context/blog-context";

interface UserHookResult {
  users: Users | null;
  isLoading: boolean;
}

export function useUsers(email: string | any): UserHookResult {
  const [isLoading, setLoading] = useState(false);
  const [users, setUser] = useState<Users | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as Users;
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return { users, isLoading };
}
