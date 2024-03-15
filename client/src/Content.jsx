// Import Outlet from react-router-dom 
import { Outlet } from "react-router-dom";

// Import components
import Login from "./pages/Login.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

import Auth from "./utils/auth";

export default function Content() {
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
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
