"use client";

import { useAuthStore } from "@/shared/stores/auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isPrivateRoute } from "../utils/isPrivateRoute";
import { LoadingScreen } from "../components/Loading/LoadingScreen";
import { internalJwtDecode } from "@/features/auth/services/internal/get-user-data";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const signIn = useAuthStore((state) => state.signIn);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (isPrivateRoute(pathname)) {
        const user = await internalJwtDecode();
        signIn(user);
        console.log(user.role);
      }
      setIsLoading(false);
    };

    verify();
  }, []);

  return isloading ? <LoadingScreen /> : <>{children}</>;
};
