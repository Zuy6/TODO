import { FetchTodosResponse } from '@/api/todos/todos';
import { LimitType } from '@/components/Pagination/Pagination';
import { Todo } from '@/types/Todo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { error } from 'console';
import {
  deleteTodo,
  fetchTodos,
  patchTodo,
  postTodo,
  putTodo,
} from './actionCreators';
import { ActivityIcon } from 'lucide-react';

export type TodosState = {
  todos: Todo[];
  count: number;
  page: number;
  limit: LimitType;
  isLoading: boolean;
  error: string;
};

const initialState: TodosState = {
  todos: [],
  count: 0,
  page: 1,
  limit: '5',
  isLoading: false,
  error: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<LimitType>) {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload.todos;
        state.count = action.payload.totalCount;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        const newTodo = action.payload;
        const { todos, limit } = state;
        todos.unshift(newTodo);
        state.todos = todos.slice(0, Number(limit));
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(putTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        state.todos = state.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      })
      .addCase(putTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(patchTodo.fulfilled, (state, action) => {
        const toggleTodo = action.payload;
        state.todos = state.todos.map((todo) =>
          todo.id === toggleTodo.id ? { ...todo, ...toggleTodo } : todo
        );
      })
      .addCase(patchTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const id = action.payload;
        state.todos = state.todos.filter((todo) => todo.id !== id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
