import React from 'react';
import { StatusText } from '../Styles';
import { useAuth } from '../features/auth/Auth';
import { Page } from '../components/page/Page';
import { useAuth0 } from '@auth0/auth0-react';

type SigninAction = 'signin' | 'signin-callback';

interface Props {
  action: SigninAction;
}

export const SignInPage = ({ action }: Props) => {
  const { loginWithRedirect } = useAuth0();
  if (action === 'signin') {
    loginWithRedirect();
  }

  return (
    <Page title="Sign In">
      <StatusText>Signing in ...</StatusText>
    </Page>
  );
};
