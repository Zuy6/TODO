import { todoApi } from '@/api/todos/todos';
import { todosSlice, TodosState } from './todosSlice';
import { AppDispatch } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '@/types/Todo';
import {
  DeleteTodosRequst,
  FetchTodosResponse,
  PatchTodosRequest,
  PostTodosRequest,
  PutTodosRequest,
} from '@/api/todos/todos.types';
import { AppleIcon } from 'lucide-react';

type FetchTodosParams = Pick<TodosState, 'page' | 'limit'>;

type RejectResponse = {
  rejectValue: string;
};
// export const fetchTodos =
//   ({ page, limit }: FetchTodosParams) =>
//   async (dispatch: AppDispatch) => {
//     const response = await apiFetchTodos(page, Number(limit));
//     dispatch(todosSlice.actions.todosFetching(response));
//   };

export const fetchTodos = createAsyncThunk<
  FetchTodosResponse,
  FetchTodosParams,
  RejectResponse
>('todos/fetchAll', async ({ page, limit }, thunkApi) => {
  try {
    const response = await todoApi.fetchAll({ page, limit: Number(limit) });
    return response;
  } catch {
    return thunkApi.rejectWithValue('Не удалось загрузить TODO');
  }
});

export const postTodo = createAsyncThunk<
  Todo,
  PostTodosRequest,
  RejectResponse
>('todos/postTodo', async ({ text }, thunkApi) => {
  try {
    const response = await todoApi.create({ text });
    return response;
  } catch {
    return thunkApi.rejectWithValue('Не удалось добавить TODO');
  }
});

export const putTodo = createAsyncThunk<Todo, PutTodosRequest, RejectResponse>(
  'todos/putTodo',
  async ({ text, id }, thunkApi) => {
    try {
      const response = await todoApi.update({ text, id });
      return response;
    } catch {
      return thunkApi.rejectWithValue('Не удалось отредактировать TODO');
    }
  }
);

export const deleteTodo = createAsyncThunk<
  number,
  DeleteTodosRequst,
  RejectResponse
>('todos/deleteTodo', async ({ id }, thunkApi) => {
  try {
    await todoApi.delete({ id });
    return id;
  } catch {
    return thunkApi.rejectWithValue('Не удалось удалить TODO');
  }
});

export const patchTodo = createAsyncThunk<
  Todo,
  PatchTodosRequest,
  RejectResponse
>('todos/patchTodo', async ({ id }, thunkApi) => {
  try {
    const response = await todoApi.toggle({ id });
    return response;
  } catch {
    return thunkApi.rejectWithValue('Не удалось отметить TODO');
  }
});
