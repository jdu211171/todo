import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import Root from './routes/root'
import ErrorPage from './ErrorPage'
import All from './routes/All/all'
import { PrivateRoute } from './PrivateRoute'
import Login from './routes/Login/Login'
import Register from './routes/Register/Register'
import Sidebar from './test'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage message='Page Not Found!' />,
    children: [
      {
        path: '/all',
        element: <All />,
      },
    ],
  },
  {
    path: '/test',
    element: <Sidebar />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
