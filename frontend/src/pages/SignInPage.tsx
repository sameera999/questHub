import React from 'react';
import { StatusText } from '../Styles';
import { useAuth } from '../features/auth/Auth';
import { Page } from '../components/page/Page';

type SigninAction = 'signin' | 'signin-callback';

interface Props {
  action: SigninAction;
}

export const SignInPage = ({ action }: Props) => {
  const { signIn } = useAuth();
  if (action === 'signin') {
    signIn();
  }

  return (
    <Page title="Sign In">
      <StatusText>Signing in ...</StatusText>
    </Page>
  );
};
