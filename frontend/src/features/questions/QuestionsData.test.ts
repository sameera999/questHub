import { Answer } from './../answers/Answer';
import { mapQuestionFromServer } from './QuestionsData';
test('when mapQuestionsFromServer is called with question, created should be turned into a Date', () => {
  const result = mapQuestionFromServer({
    questionId: 1,
    title: 'test',
    content: 'test',
    userName: 'test',
    created: '2021-01-01T00:00:00.000Z',
    answers: [],
  });
  expect(result).toEqual({
    questionId: 1,
    title: 'test',
    content: 'test',
    userName: 'test',
    created: new Date(Date.UTC(2021, 0, 1, 0, 0, 0, 0)),
    answers: [],
  });
});

test('when map questions with server is called with question and answers', () => {
  const result = mapQuestionFromServer({
    questionId: 1,
    title: 'test',
    content: 'test',
    userName: 'test',
    created: '2021-01-01T00:00:00.000Z',
    answers: [
      {
        answerId: 1,
        content: 'test',
        userName: 'test',
        created: '2021-01-01T00:00:00.000Z',
      },
    ],
  });
  expect(result).toEqual({
    questionId: 1,
    title: 'test',
    content: 'test',
    userName: 'test',
    created: new Date(Date.UTC(2021, 0, 1, 0, 0, 0, 0)),
    answers: [
      {
        answerId: 1,
        content: 'test',
        userName: 'test',
        created: new Date(Date.UTC(2021, 0, 1, 0, 0, 0, 0)),
      },
    ],
  });
});
