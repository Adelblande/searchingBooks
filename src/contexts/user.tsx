import React, { ReactNode, createContext, useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  favorites?: string[];
}

interface UserContextData {
  user: User;
  updateUser: (user: User) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  function updateUser(user: User) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
