import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectMenu } from "../features/menuSlice";

import Window from "../components/window/Window";

import Toolbar from "../components/window/Toolbar";
import ItemDetails from "../components/window/ItemDetails";
import ItemList from "../components/window/ItemList";

export default function AdminDashboard() {
  const menuState = useSelector(selectMenu);
  // console.log("menuState", menuState);

  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {menuState.store && <Window title="Store" />}
      {menuState.categories && <Window title="Categories" />}
      {menuState.products && (
        <Window title="Products" menuState={menuState.products} >
          <Toolbar />
          <div className="window__content row-no-gutters">
            <ItemDetails editMode={editMode} />
            <ItemList setEditMode={setEditMode} />
          </div>
        </Window>
      )}
    </>
  );
}