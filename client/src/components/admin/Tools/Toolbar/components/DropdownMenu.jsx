export function DropdownMenu({ sortOptions, sortType, setSortType }) {
  return (
    <>
      <menu className="toolbar__dropdown-menu">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className={`toolbar__dropdown-menu-btn ${
              sortType === option.value ? "disabled" : ""
            }`}
            onClick={() => setSortType(option.value)}
          >
            <option.Icon />
            {option.label}
          </button>
        ))}
      </menu>
    </>
  );
}
