import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../hooks/auth";

const ProtectedRoute = ({ children }: any) => {
  const { authUser } = useAuth();
  const path = usePathname();
  const router = useRouter();

  if (!authUser && path.includes("dashboard")) {
    router.push("/"); // Redirect to the homepage if not authenticated
    return null;
  }

  return children;
};

export default ProtectedRoute;
