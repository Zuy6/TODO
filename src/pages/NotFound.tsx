import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FC } from 'react';

export const NotFoundPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Страница не найдена
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            К сожалению, запрашиваемая вами страница не существует.
          </p>
          <Button asChild className="w-full">
            <Link to="/">Вернуться на главную</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
