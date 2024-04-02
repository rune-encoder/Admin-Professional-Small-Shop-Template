// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectDisplayMenu } from "../features/menuSlice";

// Import Components
import Window from "../components/window/Window";

import CategoryList from "../components/window/CategoryList";

import Toolbar from "../components/window/Toolbar";
import ItemDetails from "../components/window/ItemDetails";
import ItemList from "../components/window/ItemList";

import AdminList from "../components/window/AdminsList";

export default function AdminDashboard() {
  const activeMenu = useSelector(selectDisplayMenu);

  return (
    <>
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
    </>
  );
}
