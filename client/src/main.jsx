import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// const Home=lazy
const Home=lazy(()=>import("./pages/Home.jsx"));
const Login= lazy(()=>import("./pages/Login.jsx"));
const Chat= lazy(()=>import("./pages/Chat.jsx"));
const Groups= lazy(()=>import("./pages/Groups.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/chat/:chatid",
        element: <Chat />,
      },
      {
        path: "/Groups",
        element: <Groups />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
