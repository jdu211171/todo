import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.module.css";
import Root from "./routes/root";
import ErrorPage from "./htmlAssets/ErrorPage/ErrorPage";
import All from "./routes/All/all";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import Categories from "./routes/Categories/Categories";
// import Task from "./htmlAssets/Task/Task";
import Todays from "./routes/Todays/Todays";
import Schedule from "./routes/Schedule/schedule";
import Completed from "./routes/Completed/Completed";
import Uncompleted from "./routes/Uncompleted/Uncompleted";
// import CreateCategory from './routes/Categories/CreateCategory'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage message="Page Not Found!" />,
    children: [
      {
        path: "/",
        element: <All />,
      },
      {
        path: "/today",
        element: <Todays />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/completed",
        element: <Completed />,
      },
      {
        path: "/uncompleted",
        element: <Uncompleted />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
    ],
  },



  {
    path: "/category",
    element: <Categories />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
