'use client'

import { LocalStorageService, ServerAPI, SessionStorageService } from '@/services';
import { IRefreshAPIResponse, IUser } from '@/types/auth';
import { ACCESS_TOKEN_STORAGE_KEY } from '@/utils';
import { REFRESH_TOKEN_STORAGE_KEY } from '@/utils/constants';
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    if (accessToken) {
      ServerAPI.get<IRefreshAPIResponse>('/user/login/refresh_token', {
        'token': accessToken
      }).then((response) => {
        console.log('[debug] AuthContext, refresh api user data sucess', response)
        setUser(response.user);
      }).catch((error) => {
        console.error("error fetching user data", error);

        SessionStorageService.clear();
        LocalStorageService.clear();
        setUser(null);
        setIsAuthenticated(false);
        setIsResolvingAuthN(false)
      });
    } else {
      setIsAuthenticated(false);
      setIsResolvingAuthN(false)
    }
  }, [accessToken]);


  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
      setIsResolvingAuthN(false)
    }
  }, [user])

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