import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

afterEach(cleanup);

test('When HomePage first rendered, loading indicator should show', async () => {
  const { findByText } = render(
    <BrowserRouter>
      <HomePage></HomePage>
    </BrowserRouter>,
  );

  const loading = await findByText('Loading...');
  expect(loading).not.toBeNull();
});
