'use client'

import { useGet } from '@/hooks/useAPIQueryHooks';
import { LocalStorageService, SessionStorageService } from '@/services';
import { IRefreshAPIResponse, IUser } from '@/types/auth';
import { ACCESS_TOKEN_STORAGE_KEY } from '@/utils';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser) => void;
  isResolvingAuthN: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isResolvingAuthN, setIsResolvingAuthN] = useState<boolean>(true);
  const accessToken = SessionStorageService.get(ACCESS_TOKEN_STORAGE_KEY) ?? LocalStorageService.get(ACCESS_TOKEN_STORAGE_KEY);

  const { data: userData, isSuccess: isGettingUserDataSuccess, isError: isGettingUserDataError } = useGet<IRefreshAPIResponse>('/user/login/refresh_token', 'user-refresh-token', !!accessToken)

  useEffect(() => {
    if (isGettingUserDataSuccess) {
      setUser(userData.user)
      setIsAuthenticated(true);
      setIsResolvingAuthN(false)
    }
    else if (isGettingUserDataError) {
      SessionStorageService.clear();
      LocalStorageService.clear();
      setUser(null);
      setIsAuthenticated(false);
      setIsResolvingAuthN(false);
    }
  }, [userData])

  useEffect(() => {
    if (!accessToken) {
      setUser(null);
      setIsAuthenticated(false);
      setIsResolvingAuthN(false);
    }
  }, [accessToken])

  const logout = () => {
    //todo: make the actual logout call
    LocalStorageService.clear();
    SessionStorageService.clear();
    setUser(null);
    setIsAuthenticated(false);
    setIsResolvingAuthN(false)
  };

  const value: AuthContextType = {
    user,
    setUser,
    isResolvingAuthN,
    isAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};