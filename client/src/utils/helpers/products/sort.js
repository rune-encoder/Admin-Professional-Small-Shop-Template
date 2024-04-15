export function sortProducts(products, sortType) {
  // Create a copy of the products array to avoid mutating the original array.
  let sortedProducts = [...products];

  switch (sortType) {
    case "name-asc":
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "date-asc":
      sortedProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "date-desc":
      sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "stock-asc":
      sortedProducts.sort((a, b) => a.quantity - b.quantity);
      break;
    case "stock-desc":
      sortedProducts.sort((a, b) => b.quantity - a.quantity);
      break;
    default:
      break;
  }

  return sortedProducts;
}
