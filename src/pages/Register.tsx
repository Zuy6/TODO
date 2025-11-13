import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { useAppDispatch } from '@/hooks/redux.hooks';
import { register } from '@/store/Auth/actionCreatorsAuth';

export const RegisterPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || password.length < 6) {
      toast.error('Неправильно заполнены поля');
    }
    const response = await dispatch(register({ email, password, age }));
    setIsLoading(true);
    if (response) {
      setIsLoading(false);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
      <Toaster closeButton position="top-center" />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Регистрация</CardTitle>
          <CardDescription>
            Создайте аккаунт для управления своими задачами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Электронная почта</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Минимум 6 символов
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Возраст (опционально)</Label>
              <Input
                id="age"
                type="number"
                placeholder="18"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="120"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || password.length < 6}
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Уже есть аккаунт?{' '}
            </span>
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
