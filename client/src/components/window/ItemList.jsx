import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

export default function ItemList({ products, setSelectedProduct }) {
  return (
    <div className="window__content--wrapper col-sm-12 col-md-7">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} onClick={() => setSelectedProduct(product)}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>01/01/10</td>
              <td>{product.quantity}</td>
              <td>{product.category.name}</td>
              <td className="table__action-cell">
                <button
                  data-action="Update"
                  //   onClick={(event) => {
                  //     event.stopPropagation();
                  //     setTest(product);
                  //   }}
                >
                  <FiEdit />
                </button>
                <button
                  data-action="Delete"
                  //   onClick={(event) => {
                  //     event.stopPropagation();
                  //     setTest(product);
                  //   }}
                >
                  <BsTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
