/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { QuestionList } from '../features/questions/QuestionList';

import { Page } from '../components/page/Page';
import { PageTitle } from '../components/page/PageTitle';
import { PrimaryButton } from '../Styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/Auth';
import {
  QuestionData,
  getUnansweredQuestions,
} from '../features/questions/QuestionsData';

export const HomePage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const [questionsLoading, setQuestionsLoading] = React.useState(true);
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    let cancelled = false;
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      if (!cancelled) {
        setQuestions(unansweredQuestions);
        setQuestionsLoading(false);
      }
    };
    doGetUnansweredQuestions();
    return () => {
      cancelled = true;
    };
  }, []);

  console.log('rendered');
  const handleAskQuestionClick = () => {
    navigate('ask');
  };

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        {isAuthenticated && (
          <PrimaryButton onClick={handleAskQuestionClick}>
            Ask a question
          </PrimaryButton>
        )}
      </div>
      {questionsLoading ? (
        <div>Loading...</div>
      ) : (
        <QuestionList data={questions} />
      )}
    </Page>
  );
};
