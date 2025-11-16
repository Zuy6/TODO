import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

interface EditTodoProps {
  initialValue: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({
  initialValue,
  onSave,
  onCancel,
}) => {
  const [text, setText] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSave(text.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button type="submit">Сохранить</Button>
      <Button type="button" variant="outline" onClick={onCancel}>
        Отмена
      </Button>
    </form>
  );
};

export default EditTodo;
