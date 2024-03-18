import { useSelector } from "react-redux";
import { selectSelectedProduct } from "../../features/productsSlice";

import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BsSave, BsTrash } from "react-icons/bs";

export default function ItemView() {
  const selectedProduct = useSelector(selectSelectedProduct);

  return (
    <form className="product-edit__form">
      <div className="product-edit__label-group">
        <label className="product-edit__label-icon">
          <MdOutlineShoppingCart />
          Product Name:
        </label>
        <input type="text" placeholder="Name" value={selectedProduct.name} />
      </div>

      <div className="product-edit__label-group">
        <label className="product-edit__label-icon">
          <MdOutlineCategory />
          Category:
        </label>
        <select>
          <option>Test</option>
        </select>
      </div>

      <div className="custom-row--wrapper row-no-gutters">
        <div className="col-md-9 col-sm-5">
          <div className="custom-column--wrapper">
            <div className="product-edit__label-group">
              <label className="item-label">Price:</label>
              <input type="number" value={selectedProduct.price} />
            </div>

            <div className="product-edit__label-group">
              <label className="item-label">Quantity:</label>
              <input type="number" value={selectedProduct.quantity} />
            </div>

            <div className="product-edit__label-group">
              <label className="item-label">Featured:</label>
              <input type="checkbox" checked={selectedProduct.isFeatured} />
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-5">
          <div className="custom-column--wrapper">
            <button className="product-edit__btn">
              <BsSave />
              Save
            </button>
            <button className="product-edit__btn">
              <IoArrowBackCircleOutline />
              Cancel
            </button>
            <button className="product-edit__btn">
              <BsTrash />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="product-edit__description">
        <label className="">Description: </label>
        <textarea value={selectedProduct.shortDescription} />
      </div>

      <div className="product-edit__description">
        <label>Details:</label>
        <textarea value={selectedProduct.details} />
      </div>
    </form>

    //   <div className="col-3">
    //   <div className="custom-column--wrapper image-upload__section cbg">
    //     {/* <label>Image</label> */}
    //     <input
    //       placeholder="Image URL"
    //       id="image"
    //       type="file"
    //       name="image"
    //       required
    //     />
    //     <canvas id="myCanvas"></canvas>
    //   </div>
    // </div>
  );
}
