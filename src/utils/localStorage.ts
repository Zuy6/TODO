import { Todo } from '../types/Todo';

const TODO_KEY = 'todos';
const THEME_KEY = 'theme';

export const loadTodos = (): Todo[] => {
  const saved = localStorage.getItem(TODO_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved).map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
    }));
  } catch (e) {
    console.error('Failed to load todos', e);
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  try {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error('Failed to save todos', e);
  }
};

export const loadTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem(THEME_KEY);
  return saved === 'dark' ? 'dark' : 'light';
};

export const saveTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem(THEME_KEY, theme);
};
