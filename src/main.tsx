import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './main.module.css'
import Root from './routes/root'
import ErrorPage from './htmlAssets/ErrorPage/ErrorPage'
import All from './routes/All/all'
import Login from './routes/Login/Login'
import Register from './routes/Register/Register'
import CreateTask from './htmlAssets/CreateTask/CreateTask'
import Categories from "./routes/Categories/Categories";
import Tasks from './routes/All/task/task'
import Task from './htmlAssets/Task/Task'

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
      {
        path: '/categories',
        element:  <Categories />
      }
    ],
  },

  {
    path: '/test',
    element: <Task taskTitle={''} taskCategory={''} taskDeadline={''} taskPriority={''} handleChange={function (): void {
      throw new Error('Function not implemented.')
    } } handleDelete={function (): void {
      throw new Error('Function not implemented.')
    } } />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
