// src/routes.tsx
import React from "react"
import {
  RootRoute,
  Route,
  Outlet,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

// 1) Импорт всех наших страниц и компонентов
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Body from "./components/Body"
import Login from "./components/Login"
import Registration from "./components/Registration"
import BacketPage from "./pages/BacketPage"
import NotFound from "./pages/NotFound"

export const rootRoute = new RootRoute({
  component: () => {
    // Здесь модалка рендерится вне маршрутов (см. main.tsx),
    // поэтому на уровне роутинга только <Outlet/>
    return <Outlet />
  },
})

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/", // URL = "/"
  component: () => (
    <>
      <Header />
      <Navbar />
      <Body />
      <Footer />
    </>
  ),
})

export const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <>
      <Navbar />
      <Login
        // Внутренние функции onClose и switchToRegister не передаём,
        // потому что на странице /login они не нужны — это полноценная страница.
        // В модалке эти props уже передаются в ModalRenderer.
        onClose={() => {}}
        switchToRegister={() => {}}
      />
      <Footer />
    </>
  ),
})

export const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <>
      <Navbar />
      <Registration
        onClose={() => {}}
        switchToLogin={() => {}}
      />
      <Footer />
    </>
  ),
})

export const cartRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <>
      <Navbar />
      <BacketPage />
      <Footer />
    </>
  ),
})

export const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => (
    <>
      <Navbar />
      <NotFound />
      <Footer />
    </>
  ),
})

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    loginRoute,
    registerRoute,
    cartRoute,
    notFoundRoute,
  ]),
  defaultPreload: "intent",
  defaultPreloadDelay: 200,
})

export const AppRouter: React.FC = () => (
  <>
    <RouterProvider router={router} />
    <TanStackRouterDevtools router={router} position="bottom-left" />
  </>
)
