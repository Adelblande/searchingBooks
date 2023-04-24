import { useContext } from 'react';
import { UserContext, UserProvider } from '../contexts/user';

function useUser() {
  const context = useContext(UserContext);

  return context;
}

export { UserProvider, useUser };
