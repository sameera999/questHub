/** @jsxImportSource @emotion/react */
import React from 'react';
import './App.css';
import { Header } from './components/header/Header';
import { HomePage } from './pages/HomePage';
import { css } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { SignInPage } from './pages/SignInPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { QuestionPage } from './pages/QuestionPage';
import { SignOutPage } from './pages/SignOutPage';
import { Auth0Provider } from '@auth0/auth0-react';
const AskPage = React.lazy(() => import('./pages/AskPage'));

function App() {
  return (
    <Auth0Provider
      domain="dev-qqff7iofsebhfvpq.us.auth0.com"
      clientId="68X0UCzHdTyXSskKjTN1CX9tkR7gMcNA"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
          `}
        >
          <Header />
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route
              path="ask"
              element={
                <React.Suspense
                  fallback={
                    <div
                      css={css`
                        margin-top: 100px;
                        text-align: center;
                      `}
                    >
                      Loading...
                    </div>
                  }
                >
                  <AskPage />
                </React.Suspense>
              }
            />
            <Route path="signin" element={<SignInPage action="signin" />} />
            <Route
              path="/signin-callback"
              element={<SignInPage action="signin-callback" />}
            />
            <Route path="signout" element={<SignOutPage action="signout" />} />
            <Route
              path="/signout-callback"
              element={<SignOutPage action="signout-callback" />}
            />
            <Route path="questions/:questionId" element={<QuestionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
