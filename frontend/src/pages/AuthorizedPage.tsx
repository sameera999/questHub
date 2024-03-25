import { useAuth0 } from '@auth0/auth0-react';
import React, { ReactNode } from 'react';
import { Page } from '../components/page/Page';

interface Props {
  children: ReactNode;
}

export const AuthorizedPage: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return (
      <Page
        title="You do not have access to this 
        page"
      >
        {null}
      </Page>
    );
  }
};

export default AuthorizedPage;
