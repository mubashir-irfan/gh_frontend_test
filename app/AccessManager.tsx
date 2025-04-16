'use client'

import { useAuth } from "@/context";
import { LocalStorageService, SessionStorageService } from "@/services";
import { FullPageSpinner } from "@/shared/components";
import { ACCESS_TOKEN_STORAGE_KEY, ROUTES } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
}

const AccessManager = ({ children }: Props) => {
  const { isAuthenticated, isResolvingAuthN } = useAuth()
  const pathName = usePathname();
  const router = useRouter();
  const accessToken = SessionStorageService.get(ACCESS_TOKEN_STORAGE_KEY) ?? LocalStorageService.get(ACCESS_TOKEN_STORAGE_KEY);

  const redirectSafelyTo = (targetAbsolutePath: string) => {
    if (pathName !== targetAbsolutePath) {
      router.push(targetAbsolutePath);
    }
  };

  if (!accessToken) redirectSafelyTo('/login')

  useEffect(() => {
    if (!isResolvingAuthN) {
      if (isAuthenticated) redirectSafelyTo('/dashboard')
      else redirectSafelyTo(ROUTES.auth.login())
    }
  }, [isAuthenticated, isResolvingAuthN])

  if (isResolvingAuthN) return <FullPageSpinner />

  return children;
}

export default AccessManager;