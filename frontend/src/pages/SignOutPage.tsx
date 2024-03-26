import React from 'react';
import { Page } from '../components/page/Page';
import { StatusText } from '../Styles';
import { useAuth } from '../features/auth/Auth';
import { useAuth0 } from '@auth0/auth0-react';

type SignoutAction = 'signout' | 'signout-callback';

interface Props {
  action: SignoutAction;
}

export const SignOutPage = ({ action }: Props) => {
  let message = 'Signing out ...';

  const { signOut } = useAuth();

  switch (action) {
    case 'signout':
      signOut();
      break;
    case 'signout-callback':
      message = 'You successfully signed out!';
      break;
  }

  return (
    <Page title="Sign out">
      <StatusText>{message}</StatusText>
    </Page>
  );
};
