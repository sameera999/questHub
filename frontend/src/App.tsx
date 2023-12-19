/** @jsxImportSource @emotion/react */
import React from 'react';
import './App.css';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { css } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { AskPage } from './AskPage';
import { SignInPage } from './SignInPage';
import { NotFoundPage } from './NotFoundPage';

function App() {
  const unused = 'something';

  return (
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
          <Route path="ask" element={<AskPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
