import React, { useState, useEffect } from 'react';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Switch } from './components/ui/switch';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { loadTodos, saveTodos } from './utils/localStorage';
import { fetchTodos, putTodo } from './api/todos';

const AppContent: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [todos1, setTodos1] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const { darkMode, toggleTheme } = React.useContext(ThemeContext);

  useEffect(() => {
    saveTodos(todos);
    fetchTodos(1, 10).then((res) => setTodos1(res.data));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    putTodo(text, id);
    setTodos1((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
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
              todos={todos1}
              onToggle={toggleComplete}
              onDelete={deleteTodo}
              onEdit={editTodo}
              sortBy={sortBy}
              setSortBy={setSortBy}
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
