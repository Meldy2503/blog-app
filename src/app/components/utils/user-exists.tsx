import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";

export default async function UserEmailExists(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
}
