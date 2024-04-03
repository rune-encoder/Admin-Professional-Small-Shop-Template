// Filter Products: Create a helper function that filters products based on a search term.
// Parameters: products (array of objects), searchTerm (string)
export function filterProducts(products, searchTerm) {
  // Convert the search term to lowercase: This makes the search case-insensitive.
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  // With the products array, create a new array of products that match the search term.
  // Check if the search term is included in the product name, price, category name, or date.
  return products.filter((product) => {
    // Using the includes() method, check if our search term is found withing a field. Returns true if found, false if not.
    return (
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.price.toString().includes(lowerCaseSearchTerm) ||
      (product.category &&
        product.category.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (product.date &&
        new Date(product.date)
          .toLocaleDateString()
          .includes(lowerCaseSearchTerm))
    );
  });
}

export function sortProducts(products, sortType) {
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
