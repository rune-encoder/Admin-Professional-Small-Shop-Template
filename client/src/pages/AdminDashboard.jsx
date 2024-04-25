import Auth from "../utils/auth/auth.js";

// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectDisplayMenu } from "../features/menuSlice";
import { selectShowErrorModal } from "../features/errorSlice";

// Import Components
import {
  Header,
  Sidebar,
  Login,
  Toolbar,
  ErrorMessage,
  Home,
  Listings,
  AdminsList,
} from "../components/admin/";

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
                {(activeMenu === "products" || activeMenu === "categories") && (
                  <Listings>
                    <Toolbar title={"Listings"} />
                  </Listings>
                )}
                {activeMenu === "admins" && (
                  <AdminsList>
                    <Toolbar title={"Admins"} />
                  </AdminsList>
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
