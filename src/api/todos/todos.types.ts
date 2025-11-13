import { Todo } from '@/types/Todo';

export type FetchTodosResponse = {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
  data: Todo[];
};

export type FetchTodosRequest = {
  page: number;
  limit: number;
  token: string;
};

export type PostTodosRequest = Pick<Todo, 'text'> & {
  token: string;
};

export type PutTodosRequest = Pick<Todo, 'text' | 'id'> & {
  token: string;
};

export type DeleteTodosRequst = Pick<Todo, 'id'> & {
  token: string;
};

export type PatchTodosRequest = Pick<Todo, 'id'> & {
  token: string;
};
