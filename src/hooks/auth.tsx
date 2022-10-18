import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
  idToken?: string;
}

interface IAuthContextData {
  user: IUser;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
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
        const userLogged = {
          id: response.user.id,
          name: response.user.givenName || '',
          email: response.user.email,
          photo: response.user.photo || '',
          idToken: response.idToken,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(
          '@searchingBooks:user',
          JSON.stringify(userLogged),
        );
      }
    } catch (error) {
      throw new Error();
    }
  }

  async function signOut() {
    setUser({} as IUser);
    await AsyncStorage.removeItem('@searchingBooks:user');
    await GoogleSignin.signOut();
  }

  useEffect(() => {
    async function loadUserStorage() {
      const userStorage = await AsyncStorage.getItem('@searchingBooks:user');
      if (userStorage) {
        const userLogged = JSON.parse(userStorage);
        setUser(userLogged);
      }
    }
    loadUserStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
