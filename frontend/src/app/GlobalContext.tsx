'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

interface GlobalContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  username: string;
  setUsername: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    username,
    setUsername,
    role,
    setRole,
    isLoading,
    setIsLoading,
  }), [isAuthenticated, username, role, isLoading]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}
