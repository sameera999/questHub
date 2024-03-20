/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  FieldContainer,
  FieldError,
  FieldLabel,
  FieldTextArea,
  Fieldset,
  FormButtonContainer,
  PrimaryButton,
  SubmissionSuccess,
  gray3,
  gray6,
} from '../Styles';
import React from 'react';
import { Page } from '../components/page/Page';
import { useParams } from 'react-router-dom';
import {
  QuestionData,
  getQuestion,
  postAnswer,
} from '../features/questions/QuestionsData';
import { AnswerList } from '../features/answers/AnswerList';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { gettingQuestion, gotQuestion } from '../slices/questionsSlice';

type FormData = {
  content: string;
};

export const QuestionPage = () => {
  const dispatch = useDispatch();
  const question = useSelector((state: RootState) => state.questions.viewing);
  const [successfullySubmitted, setSuccessfullySubmitted] =
    React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onBlur',
  });
  const { questionId } = useParams();

  React.useEffect(() => {
    dispatch(gettingQuestion());
    const doGetQuestion = async (questionId: number) => {
      dispatch(gettingQuestion());
      const foundQuestion = await getQuestion(questionId);
      dispatch(gotQuestion(foundQuestion));
    };
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
  }, [questionId]);

  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: data.content,
      userName: 'Fred',
      created: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <React.Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName} on
  ${question.created.toLocaleDateString()} 
  ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <form
              css={css`
                margin-top: 20px;
              `}
              onSubmit={handleSubmit(submitForm)}
            >
              <Fieldset disabled={isSubmitting || successfullySubmitted}>
                <FieldContainer>
                  <FieldLabel htmlFor="content">Your Answer</FieldLabel>
                  <FieldTextArea
                    id="content"
                    {...register('content', {
                      required: true,
                      minLength: 50,
                    })}
                  />
                  {errors.content && errors.content.type === 'required' && (
                    <FieldError>You must enter the answer</FieldError>
                  )}
                  {errors.content && errors.content.type === 'minLength' && (
                    <FieldError>
                      The answer must be at least 50 characters
                    </FieldError>
                  )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit Your Answer
                  </PrimaryButton>
                </FormButtonContainer>
                {successfullySubmitted && (
                  <SubmissionSuccess>
                    Your answer was successfully submitted
                  </SubmissionSuccess>
                )}
              </Fieldset>
            </form>
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};
