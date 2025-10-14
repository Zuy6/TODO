import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Switch } from './components/ui/switch';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { saveTodos } from './utils/localStorage';
import {
  postTodo,
  deleteTodo as apiDeleteTodo,
  putTodo,
  patchTodo,
} from './api/todos';
import { Pagination } from './components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from './hooks/redux.hooks';
import { fetchTodos } from './store/reducer/actionCreators';
import { todosSlice } from './store/reducer/todosSlice';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, count, page, limit } = useAppSelector(
    (state) => state.todosSlice
  );

  // const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  // const [count, setCount] = useState<number>(0); //Общее кол-во todos
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const { darkMode, toggleTheme } = React.useContext(ThemeContext);
  // const [limit, setLimit] = useState<LimitType>('5');
  // const [page, setPage] = useState<number>(1);

  const refresh = useCallback(async () => {
    const action = fetchTodos({ page, limit });
    dispatch(action);
  }, [dispatch, page, limit]);

  // const { handleAddTodo, toggleComlete} = useAppContent();

  const addTodo = async (todo: Todo) => {
    await postTodo(todo.text);
    refresh();
  };

  const toggleComplete = async (id: number) => {
    await patchTodo(id);
    refresh();
  };

  const deleteTodo = async (id: number) => {
    await apiDeleteTodo(id);
    refresh();
  };

  const editTodo = async (id: number, text: string) => {
    await putTodo(text, id);
    refresh();
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  useEffect(() => {}, [count]);

  useEffect(() => {
    dispatch(todosSlice.actions.setPage(1));
    // setPage(1);
  }, [limit]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto p-4">
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
            <TodoList
              todos={todos}
              onToggle={toggleComplete}
              onDelete={deleteTodo}
              onEdit={editTodo}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <Pagination />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
