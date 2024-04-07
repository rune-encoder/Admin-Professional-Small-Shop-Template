import Auth from "../utils/auth";

// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectDisplayMenu } from "../features/menuSlice";
import { selectShowErrorModal } from "../features/errorSlice";

// Import Components
import Login from "../pages/Login.jsx";
import Header from "../components/header/Header.jsx";
import Sidebar from "../components/Sidebar";
import ErrorMessage from "../components/error/ErrorMessage.jsx";

import Test from "../components/Test";

import Window from "../components/window/Window";
import CategoryList from "../components/window/CategoryList";
import Toolbar from "../components/window/Toolbar";
import ItemDetails from "../components/window/ItemDetails";
import ItemList from "../components/window/ItemList";
import AdminList from "../components/window/AdminsList";

import Home from "../components/admin/Home.jsx";
import Listings from "../components/admin/Listings.jsx";

export default function AdminDashboard() {
  const activeMenu = useSelector(selectDisplayMenu);
  const showErrorModal = useSelector(selectShowErrorModal);

  return (
    <>
      {!Auth.loggedIn() ? (
        <Login />
      ) : (
        <>
          <div className="content">
            <Header />
            <div className="content__inner">
              <Sidebar />
              <div className="content__main">
                {activeMenu === "home" && <Home />}
                {activeMenu === "listings" && (
                  <Listings>
                    <Toolbar title={"Listings"} />
                  </Listings>
                )}
              </div>
            </div>
          </div>
          {/* <div className="content">
            <Header />
            <div className="content__inner">
              <Sidebar />

              <div className="content__main">
                {activeMenu === "store" && <Window title="Store" />}
                {activeMenu === "categories" && (
                  <Window title="Categories">
                    <CategoryList />
                  </Window>
                )}
                {activeMenu === "products" && (
                  <Window title="Products">
                    <Toolbar />
                    <div className="window__content row-no-gutters">
                      <ItemDetails />
                      <ItemList />
                    </div>
                  </Window>
                )}
                {activeMenu === "admins" && (
                  <Window title="Admins">
                    <AdminList />
                  </Window>
                )}
              </div>
            </div>
          </div> */}
        </>
      )}
      {showErrorModal && <ErrorMessage />}
    </>
  );
}
