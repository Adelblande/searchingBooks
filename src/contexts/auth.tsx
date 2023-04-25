import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../hooks/user';
import { User } from '../contexts/user';

// interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   photo?: string;
//   idToken?: string;
// }

interface AuthContextData {
  token: string;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const { WEB_CLIENT_ID } = process.env;

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string>('');

  const { updateUser } = useUser();

  async function signInWithGoogle() {
    try {
      GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
      });
      const response = await GoogleSignin.signIn();
      console.log(response);

      if (response.idToken) {
        const userLogged: User = {
          id: response.user.id,
          name: response.user.givenName || '',
          email: response.user.email,
          photo: response.user.photo || '',
          favorites: [],
        };

        await updateUser(userLogged);
        setToken(response.idToken);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    updateUser({} as User);
    setToken('');
    await GoogleSignin.signOut();
  }

  return (
    <AuthContext.Provider value={{ token, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
