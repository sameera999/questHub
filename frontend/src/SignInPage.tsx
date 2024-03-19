import React from 'react';
import { Page } from './Page';

type SigninAction = 'signin' | 'signin-callback';

interface Props {
  action: SigninAction;
}

export const SignInPage = ({ action }: Props) => (
  <Page title="Sign In">{null}</Page>
);
