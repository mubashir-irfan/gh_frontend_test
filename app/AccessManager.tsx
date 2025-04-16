'use client'
import { useAuth } from "@/context";
import { FullPageSpinner } from "@/shared/components";
import { ROUTES } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
}

const AccessManager = ({ children }: Props) => {
  const { isAuthenticated, isResolvingAuthN } = useAuth()
  const pathName = usePathname();
  const router = useRouter();

  const redirectSafelyTo = (targetAbsolutePath: string) => {
    if (pathName !== targetAbsolutePath) {
      router.push(targetAbsolutePath);
    }
  };

  useEffect(() => {
    if (!isResolvingAuthN) {
      if (isAuthenticated) {
        console.log('AM found user authenticated, redirecting to /dashboard')
        redirectSafelyTo('/dashboard')
      } else {

        console.log('AM found user authenticated, redirecting to /dashboard')
        redirectSafelyTo(ROUTES.auth.login())
      }
    }
  }, [isAuthenticated, isResolvingAuthN])

  if (isResolvingAuthN) return <FullPageSpinner />

  return children;
}

export default AccessManager;