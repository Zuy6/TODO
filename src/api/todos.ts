import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchTodos = async (page: number, limit: number) => {
  const { data } = await axios.get(
    `${API_URL}/todos?page=${page}&limit=${limit}`
  );
  console.log('data_api', data);
  return data;
};

export const postTodo = async (todoText: string) => {
  const todoDate = { text: todoText };
  const response = await axios.post(`${API_URL}/todos`, todoDate);

  return response.data;
};

export const putTodo = async (todoText: string, id: number) => {
  const todoDate = { text: todoText };
  const response = await axios.put(`${API_URL}/todos/${id}`, todoDate);

  return response.data;
};

export const deleteTodo = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/todos/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const patchTodo = async (id: number) => {
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);

  return response.data;
};

export const getTodosCount = async () => {
  const response = await axios.get(`${API_URL}/todosCount`);
  return response;
};
