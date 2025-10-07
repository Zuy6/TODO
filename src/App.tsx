import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Switch } from './components/ui/switch';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { saveTodos } from './utils/localStorage';
import {
  fetchTodos,
  postTodo,
  deleteTodo as apiDeleteTodo,
  putTodo,
  getTodosCount,
} from './api/todos';
import { LimitType, Pagination } from './components/Pagination/Pagination';

const AppContent: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [count, setCount] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const { darkMode, toggleTheme } = React.useContext(ThemeContext);
  const [limit, setLimit] = useState<LimitType>('5');
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  useEffect(() => {
    console.log('count', count);
  }, [count]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const refresh = useCallback(async () => {
    const res = await fetchTodos(page, Number(limit));
    setTodos(res.data);
  }, [page, limit]);

  useEffect(() => {
    getTodosCount().then((res) => {
      setCount(res.data);
    });
    refresh();
  }, [page, limit, refresh]);

  const addTodo = async (todo: Todo) => {
    const responseTodo = await postTodo(todo.text);
    console.log(responseTodo);
    refresh();
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = async (id: number) => {
    const responseTodo = await apiDeleteTodo(id);

    if (responseTodo.status === 200) {
      refresh();
    } else {
      console.error('id not found');
    }
  };

  const editTodo = async (id: number, text: string) => {
    await putTodo(text, id);
    refresh();
  };

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
            <Pagination
              count={count}
              limit={limit}
              setLimit={setLimit}
              page={page}
              setPage={setPage}
              todos={todos}
            />
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
