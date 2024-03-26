import React, { ReactNode } from 'react';

import { authSettings } from '../../AppSettings';
import { useAuth0 } from '@auth0/auth0-react';

interface AuthUser {
  name?: string;
  email?: string;
}
interface IAuthContext {
  isAuthenticated: boolean;
  user?: AuthUser;
  signIn: () => void;
  signOut: () => void;
  loading: boolean;
  getAccessToken: () => Promise<string>;
}
export const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
  loading: true,
  getAccessToken: () => Promise.resolve(''),
});

export const useAuth = () => React.useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  // Wrap Auth0 methods or provide additional logic as needed
  const signIn = () => loginWithRedirect();
  const signOut = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });
  // Implement getAccessToken method
  const getAccessToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      return accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      // Handle the error appropriately in your application context
      return ''; // Return an empty string or throw an error, depending on your error handling strategy
    }
  };

  const value = {
    isAuthenticated,
    user,
    signIn,
    signOut,
    loading: isLoading,
    getAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
