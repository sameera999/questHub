/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSearchParams } from 'react-router-dom';
import { QuestionList } from '../features/questions/QuestionList';
import {
  searchQuestions,
  QuestionData,
} from '../features/questions/QuestionsData';
import React from 'react';
import { Page } from '../components/page/Page';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  searchedQuestions,
  searchingQuestions,
} from '../slices/questionsSlice';

export const SearchPage = () => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const [searchParams] = useSearchParams();

  const search = searchParams.get('criteria') || '';

  React.useEffect(() => {
    let cancelled = false;
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      if (!cancelled) {
        setQuestions(foundResults);
      }
    };
    doSearch(search);
    return () => {
      cancelled = true;
    };
  }, [search]);

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};
