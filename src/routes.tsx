import * as React from 'react';
import { 
  createRouter,
  RouterProvider,
  createRoute,
  createRootRoute 
} from '@tanstack/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

// 1. Создаем корневой маршрут
const rootRoute = createRootRoute();

// 2. Создаем дочерние маршруты
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: Admin,
});

// 3. Создаем и экспортируем router
export const router = createRouter({
  routeTree: rootRoute.addChildren([
    indexRoute,
    loginRoute,
    registerRoute,
    adminRoute
  ]),
});

// 4. Подключаем типы
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// 5. Экспортируем провайдер
export default function AppRouter() {
  return <RouterProvider router={router} />;
}