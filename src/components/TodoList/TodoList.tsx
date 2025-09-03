import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../components/ui/select';
import TodoItem from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  sortBy: 'newest' | 'oldest';
  setSortBy: (order: 'newest' | 'oldest') => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  sortBy,
  setSortBy,
}) => {
  const sorted = [...todos].sort((a, b) => {
    const diff =
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return sortBy === 'newest' ? -diff : diff;
  });

  return (
    <div className="mt-4">
      <div className="mb-3">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Новые сначала</SelectItem>
            <SelectItem value="oldest">Старые сначала</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ul className="border dark:border-gray-700 rounded-md">
        {sorted.length === 0 ? (
          <li className="p-4 text-center text-gray-500 dark:text-gray-400">
            Нет задач
          </li>
        ) : (
          sorted.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
