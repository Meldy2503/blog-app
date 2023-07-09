import { useToast } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useRouter } from "next/navigation";
import {
  setDoc,
  doc,
  DocumentData,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import isUsernameExists from "../components/utils/user-exists";
import { SuccessToast, ErrorToast } from "../components/utils/toast";
import { Users } from "../context/blog-context";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<DocumentData | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (authUser) {
        const ref = collection(db, "users");
        const q = query(ref, where("email", "==", authUser.email));
        const querySnapshot = await getDocs(q);
        const userDocs = querySnapshot.docs;
        if (userDocs.length > 0) {
          const userDoc = userDocs[0];
          setUser(userDoc.data() as Users);
        }
      }
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading, authUser]);

  return { user, isLoading, error, setUser };
}

interface SignUpProps {
  username: string;
  email: string;
  password: string;
  name: string;
  joiningAs: string;
  redirectTo: string;
}
interface SignInProps {
  email: string;
  password: string;
  redirectTo: string;
}

interface UserHookResult {
  user: Users | null;
  isLoading: boolean;
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  async function login({
    email,
    password,
    redirectTo = "/pages/dashboard",
  }: SignInProps) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      SuccessToast("Login Successful!");

      router.push(redirectTo);
    } catch (error: any) {
      ErrorToast("Login Failed!");

      setLoading(false);
      return false; // Return false if login failed
    }
    setLoading(false);

    return true; // Return true if login succeeded
  }

  return { login, isLoading };
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  async function register({
    name,
    joiningAs,
    username,
    email,
    password,
    redirectTo = "/pages/dashboard",
  }: SignUpProps) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      ErrorToast("Username already exists");
      setLoading(false);
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", email), {
          id: email,
          username: username?.toLowerCase(),
          name,
          email,
          joiningAs,
          avatar: "",
          date: Date.now(),
        });

        SuccessToast("Account created successfully!");

        router.push(redirectTo);
      } catch (error: any) {
        ErrorToast("Sign up Failed!");
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const router = useRouter();

  async function logout() {
    if (await signOut()) {
      SuccessToast("Successfully logged out!");
      router.push("/");
    }
  }

  return { logout, isLoading };
}
