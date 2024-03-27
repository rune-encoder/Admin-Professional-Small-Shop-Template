// Import Outlet from react-router-dom
import { Outlet } from "react-router-dom";

// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectShowErrorModal } from "./features/errorSlice.js";

// Import Components
import Login from "./pages/Login.jsx";
import Header from "./components/header/Header.jsx";
import Sidebar from "./components/Sidebar";
import ErrorMessage from "./components/error/ErrorMessage.jsx";

import Auth from "./utils/auth";

export default function Content() {
  const showErrorModal = useSelector(selectShowErrorModal);

  return (
    <>
      {!Auth.loggedIn() ? (
        <Login />
      ) : (
        <>
          <Sidebar />
          <div className="content">
            <Header />
            <main className="content__main">
              <Outlet />
            </main>
          </div>
        </>
      )}
      {showErrorModal && <ErrorMessage />}
    </>
  );
}
