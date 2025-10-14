import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { todosSlice } from './reducer/todosSlice';

const rootReducer = combineReducers({ todosSlice: todosSlice.reducer });
export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// const obj = {test:0}
// const key = 'test'

// obj[key]
