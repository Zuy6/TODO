import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { router } from './routes/routs';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { RouterProvider } from 'react-router-dom';

const store = setupStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
