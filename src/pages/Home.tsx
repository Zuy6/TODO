import React, { useState, useEffect, useContext, FC } from 'react';
import { ThemeProvider, ThemeContext } from '@/contexts/ThemeContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import AddTodo from '@/components/AddTodo/AddTodo';
import TodoList from '@/components/TodoList/TodoList';
import { Todo } from '@/types/Todo';
import { saveTodos } from '@/utils/localStorage';
import { Pagination } from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import {
  fetchTodos,
  patchTodo,
  postTodo,
  putTodo,
  deleteTodo,
} from '@/store/Todos/actionCreatorsTodos';
import { todosSlice } from '@/store/Todos/todosSlice';
import { Spinner } from '@/components/ui/spinner';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { todos, page, limit, isLoading, error } = useAppSelector(
    (state) => state.todosSlice
  );
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.authSlice);

  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const { darkMode, toggleTheme } = React.useContext(ThemeContext);

  const addTodo = async ({ text }: Todo) => {
    dispatch(postTodo({ text, token }));
  };

  const editTodo = async (id: number, text: string) => {
    dispatch(putTodo({ text, id, token }));
  };

  const toggleComplete = async (id: number) => {
    dispatch(patchTodo({ id, token }));
  };

  const deleteTodos = async (id: number) => {
    const resultAction = await dispatch(deleteTodo({ id, token }));
    if (deleteTodo.fulfilled.match(resultAction)) {
      dispatch(fetchTodos({ page, limit, token }));
    }
  };
  const handlerLogin = () => {
    navigate('/login');
  };

  const handlerRegistration = () => {
    navigate('/Register');
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // useEffect(() => {}, [count]);

  useEffect(() => {
    dispatch(todosSlice.actions.setPage(1));
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchTodos({ page, limit, token }));
    } else {
      toast.error('Пожалуйста, зайдите в систему');
    }
  }, [dispatch, limit, page]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Toaster closeButton position="top-center" />
      <div className="container mx-auto p-4">
        {token ? (
          <>
            <Button
              onClick={() => console.log('Ты вышел!')}
              type="button"
              className="w-full"
            >
              {'Выход'}
            </Button>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Список задач</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Тема</span>
                    <Switch checked={darkMode} onCheckedChange={toggleTheme} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AddTodo addTodo={addTodo} />
                {isLoading ? (
                  <Spinner />
                ) : (
                  <TodoList
                    todos={todos}
                    onToggle={toggleComplete}
                    onDelete={deleteTodos}
                    onEdit={editTodo}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                )}
                <Pagination />
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <div>
              <Button onClick={handlerLogin} type="button" className="w-full">
                {'Вход'}
              </Button>
              <Button
                onClick={handlerRegistration}
                type="button"
                className="w-full"
              >
                {'Регистрация'}
              </Button>
            </div>
            <div>"Нет карт"</div>
          </>
        )}
      </div>
    </div>
  );
};
