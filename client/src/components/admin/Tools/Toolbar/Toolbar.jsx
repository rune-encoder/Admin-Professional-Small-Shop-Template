// Import Custom Hooks
import { useToolbarState } from "./hooks/useToolbarState";

// Import Components
import {
  ToolbarTitle,
  ToolbarButtons,
  DropdownMenu,
  ListTypeButtons,
  Searchbar,
} from "./components";

export function Toolbar({ title }) {
  const {
    product: { mode: productMode, setMode: setProductMode },
    category: { mode: categoryMode, setMode: setCategoryMode },
    list: { type: activeMenu, set: changeMenuDisplay },
    search: { term: searchTerm, set: setSearchTerm },
    sort: { type: sortType, options: sortOptions, set: setSortType },
  } = useToolbarState();

  return (
    <div className="toolbar">
      {/* Toolbar Title */}
      <ToolbarTitle title={title}>
        {/* Toolbar Buttons */}
        <ToolbarButtons
          sortType={sortType}
          activeMenu={activeMenu}
          sortOptions={sortOptions}
          categoryMode={categoryMode}
          setCategoryMode={setCategoryMode}
          productMode={productMode}
          setProductMode={setProductMode}
        >
          {/* Dropdown Menu */}
          <DropdownMenu
            sortOptions={sortOptions}
            sortType={sortType}
            setSortType={setSortType}
          />
        </ToolbarButtons>
      </ToolbarTitle>

      {/* Search Bar */}
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* List Selection */}
      {title === "Listings" && (
        <ListTypeButtons
        activeMenu={activeMenu}
        changeMenuDisplay={changeMenuDisplay}
          setCategoryMode={setCategoryMode}
          setProductMode={setProductMode}
        />
      )}
    </div>
  );
}
