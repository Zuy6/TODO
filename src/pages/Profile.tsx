import React, { useState, useEffect, FC } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast, Toaster } from 'sonner';
import { ThemeContext } from '@/contexts/ThemeContext';

// Типы (можно вынести в отдельный файл)
interface User {
  id: number;
  email: string;
  age?: number;
  createdAt?: string;
}

export const ProfilePage: FC = () => {
 const { darkMode, toggleTheme } = React.useContext(ThemeContext);
  // Мок-данные — замените на данные из Redux или API
  const [user] = useState<User>({
    id: 1,
    email: 'user@example.com',
    age: 28,
    createdAt: '2024-03-15T10:30:00Z',
  });

  // Состояния формы смены пароля
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Новые пароли не совпадают');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Новый пароль должен содержать минимум 6 символов');
      return;
    }

    setIsSubmitting(true);
    // Здесь будет dispatch(changePasswordThunk({ oldPassword, newPassword }))
    setTimeout(() => {
      setIsSubmitting(false);
      // Успешное обновление — можно показать тост
    }, 1500);
  };

  // Форматирование даты
  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Toaster closeButton position="top-center" />
      <div className="container mx-auto p-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Профиль</CardTitle>
                <CardDescription>Управляйте своими данными и настройками</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Тема</span>
                <Switch checked={darkMode} onCheckedChange={toggleTheme} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Информация о пользователе */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Личная информация</h3>
              <div className="grid gap-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Email:</span>{' '}
                  <span className="font-medium">{user.email}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Возраст:</span>{' '}
                  <span className="font-medium">{user.age || 'Не указан'}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Дата регистрации:</span>{' '}
                  <span className="font-medium">{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Форма смены пароля */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <h3 className="font-medium text-lg">Смена пароля</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Текущий пароль</Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Новый пароль</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтверждение нового пароля</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Сохранение...' : 'Сменить пароль'}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}