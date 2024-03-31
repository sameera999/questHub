import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

afterEach(cleanup);

jest.mock('../features/questions/QuestionsData', () => ({
  getUnansweredQuestions: () => {
    return Promise.resolve([
      {
        questionId: 1,
        title: 'Title1 test',
        content: 'Content2 test',
        userName: 'User1',
        created: new Date(2019, 1, 1),
        answers: [],
      },
      {
        questionId: 2,
        title: 'Title2 test',
        content: 'Content2 test',
        userName: 'User2',
        created: new Date(2019, 1, 1),
        answers: [],
      },
    ]);
  },
}));

test('When HomePage first rendered, loading indicator should show', async () => {
  const { findByText } = render(
    <BrowserRouter>
      <HomePage></HomePage>
    </BrowserRouter>,
  );

  const loading = await findByText('Loading...');
  expect(loading).not.toBeNull();
});

test('when homepage data returned, it should render questions', async () => {
  const { findByText } = render(
    <BrowserRouter>
      <HomePage></HomePage>
    </BrowserRouter>,
  );

  expect(await findByText('Title1 test')).toBeInTheDocument();
  expect(await findByText('Title2 test')).toBeInTheDocument();
});
