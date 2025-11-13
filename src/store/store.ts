import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { todosSlice } from './Todos/todosSlice';
import { authSlice } from './Auth/authSlice';

const rootReducer = combineReducers({
  todosSlice: todosSlice.reducer,
  authSlice: authSlice.reducer,
});
export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
