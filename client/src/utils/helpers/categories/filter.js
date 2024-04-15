export function filterCategories(categories, searchTerm) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return categories.filter((category) => {
    return category.name.toLowerCase().includes(lowerCaseSearchTerm);
  });
}
