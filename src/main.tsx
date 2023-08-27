import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import Root from './routes/root'
import ErrorPage from './htmlAssets/ErrorPage/ErrorPage'
import All from './routes/All/all'
import { PrivateRoute } from './PrivateRoute'
import Login from './routes/Login/Login'
import Register from './routes/Register/Register'
import Sidebar from './test'
import CreateTask from './routes/CreateTask'

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
    element:<Root />,
    errorElement: <ErrorPage message='Page Not Found!' />,
    children: [
      {
        path: '/',
        element:  <All />,
      },
    ],
  },

  {
    path: '/test',
    element: <CreateTask />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
