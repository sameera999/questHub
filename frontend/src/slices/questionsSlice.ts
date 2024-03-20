import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionData } from '../features/questions/QuestionsData';

interface QuestionsState {
  loading: boolean;
  unanswered: QuestionData[];
  viewing: QuestionData | null;
  searched: QuestionData[];
}

const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: [],
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState: initialQuestionState,
  reducers: {
    gettingUnansweredQuestions(state) {
      state.loading = true;
    },
    gotUnansweredQuestions(state, action: PayloadAction<QuestionData[]>) {
      state.unanswered = action.payload;
      state.loading = false;
    },
    gettingQuestion(state) {
      state.viewing = null;
      state.loading = true;
    },
    gotQuestion(state, action: PayloadAction<QuestionData | null>) {
      state.viewing = action.payload;
      state.loading = false;
    },
    searchingQuestions(state) {
      state.searched = [];
      state.loading = true;
    },
    searchedQuestions(state, action: PayloadAction<QuestionData[]>) {
      state.searched = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const {
  gettingUnansweredQuestions,
  gotUnansweredQuestions,
  gettingQuestion,
  gotQuestion,
  searchingQuestions,
  searchedQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;
