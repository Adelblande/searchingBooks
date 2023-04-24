import { useContext } from 'react';
import { AuthContext, AuthProvider } from '../contexts/auth';

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
