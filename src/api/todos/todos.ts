import axios from 'axios';
import {
  DeleteTodosRequst,
  FetchTodosRequest,
  FetchTodosResponse,
  PatchTodosRequest,
  PostTodosRequest,
  PutTodosRequest,
} from './todos.types';
import { Todo } from '@/types/Todo';

const API_URL = 'http://localhost:3001';

const fetchTodos = async ({
  page,
  limit,
  token,
}: FetchTodosRequest): Promise<FetchTodosResponse> => {
  const { data } = await axios.get<FetchTodosResponse>(
    `${API_URL}/todos?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
};

const postTodo = async ({ text, token }: PostTodosRequest) => {
  const response = await axios.post<Todo>(
    `${API_URL}/todos`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const putTodo = async ({ text, id, token }: PutTodosRequest) => {
  const response = await axios.put<Todo>(
    `${API_URL}/todos/${id}`,
    {
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const deleteTodo = async ({ id, token }: DeleteTodosRequst) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const patchTodo = async ({ id, token }: PatchTodosRequest) => {
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const todoApi = {
  fetchAll: fetchTodos,
  create: postTodo,
  update: putTodo,
  delete: deleteTodo,
  toggle: patchTodo,
};
