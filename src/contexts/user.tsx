import React, { ReactNode, createContext, useState } from 'react';
interface BookProps {
  id: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  favorites: BookProps[];
}

interface UserContextData {
  user: User;
  updateUser: (user: User) => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function updateUser(user: User) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
