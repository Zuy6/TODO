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
}: FetchTodosRequest): Promise<FetchTodosResponse> => {
  const { data } = await axios.get<FetchTodosResponse>(
    `${API_URL}/todos?page=${page}&limit=${limit}`
  );
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
};

const postTodo = async (payload: PostTodosRequest) => {
  const response = await axios.post<Todo>(`${API_URL}/todos`, payload);

  return response.data;
};

const putTodo = async ({ text, id }: PutTodosRequest) => {
  const response = await axios.put<Todo>(`${API_URL}/todos/${id}`, {
    text,
  });

  return response.data;
};

const deleteTodo = async ({ id }: DeleteTodosRequst) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    console.error(error);
  }
};

const patchTodo = async ({ id }: PatchTodosRequest) => {
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);

  return response.data;
};
 
export const todoApi = {
  fetchAll: fetchTodos,
  create: postTodo,
  update: putTodo,
  delete: deleteTodo,
  toggle: patchTodo,
}