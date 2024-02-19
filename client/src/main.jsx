import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// |========== IMPORT MAIN COMPONENTS: PAGES ==========|
import App from "./App.jsx";
import Home from "./pages/Home.jsx";

// |========== IMPORT CSS STYLES ==========|
// <===== MAIN GLOBAL STYLE =====>
import "./styles/index.scss";

// <===== PAGES STYLES =====>
import "./styles/Home.scss";

// <===== COMPOENT GROUP STYLES =====>
// import "./styles/Header.scss";
import "./styles/Footer.scss";

// <===== UTILITIES STYLES =====>
import "./styles/Sidebar.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not found</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Home",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
