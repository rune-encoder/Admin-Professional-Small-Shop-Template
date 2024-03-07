import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// |========== IMPORT MAIN COMPONENTS: PAGES ==========|
import App from "./App.jsx";
import Store from "./pages/Store.jsx";

// |========== IMPORT CSS STYLES ==========|
import "./styles/main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not found</div>,
    children: [
      {
        index: true,
        element: <Store />,
      },
      {
        path: "/Store",
        element: <Store />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
