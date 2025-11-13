import {
  HomePage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
} from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  { path: '/', Component: HomePage },
  { path: '/login', Component: LoginPage },
  { path: '/register', Component: RegisterPage },
  { path: '/profile', Component: ProfilePage },
  { path: '/*', Component: NotFoundPage },
]);
