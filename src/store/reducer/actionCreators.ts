import { fetchTodos as apiFetchTodos } from '@/api/todos';
import { todosSlice, TodosState } from './todosSlice';
import { AppDispatch } from '../store';

type FetchTodosParams = Pick<TodosState, 'page' | 'limit'>;

export const fetchTodos =
  ({ page, limit }: FetchTodosParams) =>
  async (dispatch: AppDispatch) => {
    const response = await apiFetchTodos(page, Number(limit));
    dispatch(todosSlice.actions.todosFetching(response));
  };
