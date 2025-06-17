import React from "react";
import {
  RootRoute,
  Route,
  Outlet,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Login from "./components/Login";
import Registration from "./components/Registration";
import BacketPage from "./pages/BacketPage";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPage"; 

export const rootRoute = new RootRoute({
  component: () => <Outlet />,
});

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <>
      <Header />
      <Navbar />
      <Body />
      <Footer />
    </>
  ),
});

export const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <>
      <Navbar />
      <Login onClose={() => {}} switchToRegister={() => {}} />
      <Footer />
    </>
  ),
});

export const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <>
      <Navbar />
      <Registration onClose={() => {}} switchToLogin={() => {}} />
      <Footer />
    </>
  ),
});

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
});

// Маршрут админки
export const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <>
      <Navbar />
      <AdminPanel />
      <Footer />
    </>
  ),
});

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
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    loginRoute,
    registerRoute,
    cartRoute,
    adminRoute,   
    notFoundRoute,
  ]),
  defaultPreload: "intent",
  defaultPreloadDelay: 200,
});

export const AppRouter: React.FC = () => (
  <>
    <RouterProvider router={router} />
    <TanStackRouterDevtools router={router} position="bottom-left" />
  </>
);