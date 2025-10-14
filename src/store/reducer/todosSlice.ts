import { FetchTodosResponse } from '@/api/todos';
import { LimitType } from '@/components/Pagination/Pagination';
import { Todo } from '@/types/Todo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TodosState = {
  todos: Todo[];
  count: number;
  page: number;
  limit: LimitType;
};

const initialState: TodosState = { todos: [], count: 0, page: 1, limit: '5' };

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todosFetching(state, action: PayloadAction<FetchTodosResponse>) {
      state.todos = action.payload.todos;
      state.count = action.payload.totalCount;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<LimitType>) {
      state.limit = action.payload;
    },
  },
});
