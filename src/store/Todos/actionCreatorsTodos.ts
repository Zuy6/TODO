import { todoApi } from '@/api/todos/todos';
import { TodosState } from './todosSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '@/types/Todo';
import {
  DeleteTodosRequst,
  FetchTodosResponse,
  PatchTodosRequest,
  PostTodosRequest,
  PutTodosRequest,
} from '@/api/todos/todos.types';

type FetchTodosParams = Pick<TodosState, 'page' | 'limit'> & {
  token: string;
};

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
  Todo[],
  FetchTodosParams,
  RejectResponse
>('todos/fetchAll', async ({ page, limit, token }, thunkApi) => {
  try {
    const { data } = await todoApi.fetchAll({
      page,
      limit: Number(limit),
      token,
    });
    return data;
  } catch {
    return thunkApi.rejectWithValue('Не удалось загрузить TODO');
  }
});

export const postTodo = createAsyncThunk<
  Todo,
  PostTodosRequest,
  RejectResponse
>('todos/postTodo', async ({ text, token }, thunkApi) => {
  try {
    const response = await todoApi.create({ text, token });
    return response;
  } catch {
    return thunkApi.rejectWithValue('Не удалось добавить TODO');
  }
});

export const putTodo = createAsyncThunk<Todo, PutTodosRequest, RejectResponse>(
  'todos/putTodo',
  async ({ text, id, token }, thunkApi) => {
    try {
      const response = await todoApi.update({ text, id, token });
      return response;
    } catch {
      return thunkApi.rejectWithValue('Не удалось отредактировать TODO');
    }
  }
);

export const deleteTodo = createAsyncThunk<
  void,
  DeleteTodosRequst,
  RejectResponse
>('todos/deleteTodo', async ({ id, token }, thunkApi) => {
  try {
    await todoApi.delete({ id, token });
  } catch {
    return thunkApi.rejectWithValue('Не удалось удалить TODO');
  }
});

export const patchTodo = createAsyncThunk<
  Todo,
  PatchTodosRequest,
  RejectResponse
>('todos/patchTodo', async ({ id, token }, thunkApi) => {
  try {
    const response = await todoApi.toggle({ id, token });
    return response;
  } catch {
    return thunkApi.rejectWithValue('Не удалось отметить TODO');
  }
});
