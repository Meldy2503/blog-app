import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { usePathname, useRouter } from "next/navigation";
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

// to get a loged in user
export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<DocumentData | null>(null);
  const router = useRouter();
  const pathname = usePathname();

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
  redirectTo: string;
}
interface SignInProps {
  email: string;
  password: string;
  redirectTo: string;
}

// to log in
export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  async function login({
    email,
    password,
    redirectTo = "/dashboard",
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

// to register
export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  async function register({
    name,
    username,
    email,
    password,
    redirectTo = "/auth/sign-in",
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

// to log out
export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const router = useRouter();

  async function logout() {
    if (await signOut()) {
      router.push("/");
      SuccessToast("Successfully logged out!");
    }
  }

  return { logout, isLoading };
}
