import { useCallback } from "react";

// Import Redux Hooks
import { useDispatch } from "react-redux";

// Import Redux Actions
import { setProductMode } from "../../../../../features/products/productSlice";

// Import Redux Thunks
import {
  getProducts,
  deleteProduct,
} from "../../../../../features/products/productThunks";

// Import Embla Carousel
import useEmblaCarousel from "embla-carousel-react";

// Import Components
import { ActionButtons } from "../../../Tools";

// Import React Icons
import { IoPricetagOutline } from "react-icons/io5";
import {
  MdOutlineCategory,
  MdOutlineShoppingCart,
  MdOutlineCalendarToday,
} from "react-icons/md";

export function ProductRow({ product }) {
  // ==============================
  // useDispatch Hooks Section
  // ==============================
  const dispatch = useDispatch();

  // ==============================
  // useEmblaCarousel Hooks Section
  // ==============================
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    // dragFree: true,
    // containScroll: "trimSnaps",
  });

  // ==============================
  // Event Handlers Section
  // ==============================
  const handleDeleteProduct = useCallback(
    async (product) => {
      // Get the product id and images
      let productId = product._id;
      let productImages = product.image.map(({ __typename, ...rest }) => rest);

      // Wait for the product to be deleted
      await dispatch(deleteProduct({ id: productId, images: productImages }));

      // Refresh the products list global state by fetching the products again. (Server or Cache)
      dispatch(getProducts());
    },
    [dispatch]
  );

  return (
    <div className="embla__item-row" ref={emblaRef}>
      <div key={product._id} className="embla__container">
        <div className="item-cell embla__slide--product">
          <div className="product-row__img-wrapper">
            <img
              src={product.image[0].url}
              alt={product.name}
              className="product-row__img"
            />
          </div>
        </div>

        <div className="item-cell embla__slide--product">
          <div className="item-wrapper">
            <div className="item-group">
              <div className="item-label">
                <MdOutlineShoppingCart />
                Product:
              </div>
              <div className="item-value">{product.name}</div>
            </div>

            <div className="item-value--subtle">
              {product.category ? (
                <>
                  <MdOutlineCategory /> {product.category.name}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="item-cell embla__slide--product">
          <div className="item-label">
            <MdOutlineCalendarToday />
            Date:
          </div>
          <div className="item-value">01/01/10</div>
        </div>

        <div className="item-cell embla__slide--product">
          <div className="item-wrapper">
            <div className="item-group">
              <div className="item-label">
                <IoPricetagOutline />
                Price:
              </div>
              <div className="item-value">${product.price}</div>
            </div>
            <div className="item-value--subtle">Stock: {product.quantity}</div>
          </div>
        </div>

        <ActionButtons
          type="view"
          emblaSlide="embla__slide--product"
          onClick={() => dispatch(setProductMode({ mode: "view", product }))}
        />

        <ActionButtons
          type="update"
          emblaSlide="embla__slide--product"
          onClick={() => dispatch(setProductMode({ mode: "update", product }))}
        />

        <ActionButtons
          type="delete"
          emblaSlide="embla__slide--product"
          onClick={() => handleDeleteProduct(product)}
        />
      </div>
    </div>
  );
}
