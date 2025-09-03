import React, { useState } from 'react';
import { Checkbox } from '../../components/ui/checkbox';
import { Button } from '../../components/ui/button';
import { Todo } from '../../types/Todo';
import EditTodo from '../EditTodo/EditTodo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="flex items-center justify-between p-3 border-b dark:border-gray-700">
      {isEditing ? (
        <EditTodo
          initialValue={todo.text}
          onSave={(text) => {
            onEdit(todo.id, text);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
            />
            <span
              className={`${
                todo.completed
                  ? 'line-through text-gray-500 dark:text-gray-400'
                  : ''
              } cursor-pointer`}
              onClick={() => onToggle(todo.id)}
            >
              {todo.text}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onDelete(todo.id)}
            >
              Удалить
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
