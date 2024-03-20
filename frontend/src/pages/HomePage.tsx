/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { QuestionList } from '../features/questions/QuestionList';
import {
  getUnansweredQuestions,
  QuestionData,
} from '../features/questions/QuestionsData';
import { Page } from '../components/page/Page';
import { PageTitle } from '../components/page/PageTitle';
import { PrimaryButton } from '../Styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import {
  gettingUnansweredQuestions,
  gotUnansweredQuestions,
} from '../slices/questionsSlice';

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: RootState) => state.questions.unanswered,
  );
  const questionsLoading = useSelector(
    (state: RootState) => state.questions.loading,
  );

  React.useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      dispatch(gettingUnansweredQuestions());
      const unansweredQuestions = await getUnansweredQuestions();
      dispatch(gotUnansweredQuestions(unansweredQuestions));
    };
    doGetUnansweredQuestions();
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
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div>Loading...</div>
      ) : (
        <QuestionList data={questions} />
      )}
    </Page>
  );
};
