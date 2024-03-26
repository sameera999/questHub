import React, { ReactNode } from 'react';

import { authSettings } from '../../AppSettings';
import { useAuth0 } from '@auth0/auth0-react';
import { createAuth0Client } from '@auth0/auth0-spa-js';

interface AuthUser {
  name?: string;
  email?: string;
  picture?: string;
}
interface IAuthContext {
  isAuthenticated: boolean;
  user?: AuthUser;
  signIn: () => void;
  signOut: () => void;
  loading: boolean;
}
export const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  user: {},
  signIn: () => {},
  signOut: () => {},
  loading: true,
});

export const useAuth = () => React.useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated, user, loginWithRedirect, logout, isLoading } =
    useAuth0();

  // Wrap Auth0 methods or provide additional logic as needed
  const signIn = () => loginWithRedirect();
  const signOut = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });
  // Implement getAccessToken method

  const value = {
    isAuthenticated,
    user,
    signIn,
    signOut,
    loading: isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const getAccessToken = async () => {
  const auth0FromHook = await createAuth0Client({
    domain: authSettings.domain,
    clientId: authSettings.clientId,
  });
  const accessToken = await auth0FromHook?.getTokenSilently();
  return accessToken;
};
