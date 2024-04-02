// Import Redux Hooks
import { useSelector } from "react-redux";

// Import Redux Selectors
import { selectMenu } from "../features/menuSlice";

// Import Components
import Window from "../components/window/Window";

import CategoryList from "../components/window/CategoryList";

import Toolbar from "../components/window/Toolbar";
import ItemDetails from "../components/window/ItemDetails";
import ItemList from "../components/window/ItemList";

export default function AdminDashboard() {
  const menuState = useSelector(selectMenu);

  return (
    <>
      {menuState.store && <Window title="Store" />}
      {menuState.categories && <Window title="Categories">
        <CategoryList />
        </Window>
        }
      {menuState.products && (
        <Window title="Products">
          <Toolbar />
          <div className="window__content row-no-gutters">
            <ItemDetails />
            <ItemList />
          </div>
        </Window>
      )}
    </>
  );
}
