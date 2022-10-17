import React, { createContext, useContext, ReactNode, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: IUser;
  signInWithGoogle(): Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const { WEB_CLIENT_ID } = process.env;
const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser);

  async function signInWithGoogle() {
    try {
      GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
      });
      const response = await GoogleSignin.signIn();
      if (response.idToken) {
        setUser({
          id: response.user.id,
          name: response.user.givenName || '',
          email: response.user.email,
          photo: response.user.photo || '',
        });
      }
      console.log('signInWithGoogle-->', response);
    } catch (error) {
      throw new Error();
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
