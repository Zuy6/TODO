import { Todo } from '@/types/Todo';

export type FetchTodosResponse = {
  todos: Todo[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type FetchTodosRequest = {
  page: number;
  limit: number;
};

export type PostTodosRequest = Pick<Todo, 'text'>;

export type PutTodosRequest = Pick<Todo, 'text' | 'id'>;

export type DeleteTodosRequst = Pick<Todo, 'id'>;

export type PatchTodosRequest = Pick<Todo, 'id'>;
