export function sortCategories(categories, sortType) {
  let sortedCategories = [...categories];

  switch (sortType) {
    case "name-asc":
      sortedCategories.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sortedCategories.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return sortedCategories;
}
