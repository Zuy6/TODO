import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { postTodo } from '@/api/todos';

interface AddTodoProps {
  addTodo: (todo: Todo) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Поле не может быть пустым');
      return;
    }
    setError('');
    addTodo({
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    });

    postTodo(text.trim());

    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        type="text"
        placeholder="Введите задачу..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Новая задача"
      />
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
      <Button type="submit">Добавить</Button>
    </form>
  );
};

export default AddTodo;
