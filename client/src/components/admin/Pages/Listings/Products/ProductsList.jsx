// Import Custom Hooks
import { useProducts } from "./hooks/useProducts";

// Import Components
import { ProductRow } from "./ProductRow";

export function ProductsList() {
  const { sortedProducts, getProductsStatus } = useProducts();

  // !Revisit: Handling Loading State
  if (getProductsStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="list">
      {sortedProducts.map((product) => (
        <ProductRow key={product._id} product={product} />
      ))}
    </div>
  );
}
