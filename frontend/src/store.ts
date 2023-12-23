import { configureStore } from '@reduxjs/toolkit';
import questionsSlice from './slices/questionsSlice';

const store = configureStore({
  reducer: {
    questions: questionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
