import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import FormSimpleDemo from '../src/routes/demo.form.simple'
import FormAddressDemo from '../src/routes/demo.form.address'
import TanStackQueryDemo from '../src/routes/demo.tanstack-query'
import TanStackQueryLayout from '../src/integrations/tanstack-query/layout'
import * as TanStackQueryProvider from '../src/integrations/tanstack-query/root-provider'
import './styles/global.css'
import reportWebVitals from './reportWebVitals'
import App from './App'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />

      <TanStackQueryLayout />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  FormSimpleDemo(rootRoute),
  FormAddressDemo(rootRoute),
  TanStackQueryDemo(rootRoute),
])

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
