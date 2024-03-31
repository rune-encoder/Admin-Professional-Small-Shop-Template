// ! Revisit: Refactor and Comment
import React from "react";

// Import React Hooks
import { useRef } from "react";

// Import Redux Hooks
import { useSelector } from "react-redux";

import { selectCurrentProduct } from "../../features/products/productSelectors";

import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export default function ImagePreview({
  selectedImages,
  displayImage,
  handleImageChange,
  setDisplayImage,
  handleImageUpdate,
}) {
  const currentProduct = useSelector(selectCurrentProduct);

  const imageGroupRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (imageGroupRef.current) {
      imageGroupRef.current.scrollBy(scrollOffset, 0);
    }
  };

  return (
    <>
      {currentProduct ? (
        // !WORKING: ITEM EDIT ===================================
        <>
          <section className="item-details__top-section">
            {displayImage && (
              <img
              src={displayImage.dataURL ? displayImage.dataURL : displayImage.url}
                alt="Top"
                className="item__image"
              />
            )}
          </section>

          <section className="select-img__section--wrapper">
            <div className="select-img__section">
              <button className="left-img-btn" onClick={() => scroll(-50)}>
                <IoIosArrowDropleft />
              </button>

              <div ref={imageGroupRef} className="select-img__group">
                {selectedImages.map((image, index) => (
                  <React.Fragment key={image._id}>
                    <div className="select-img">
                      <img
                        className="item__image"
                        src={image.dataURL ? image.dataURL : image.url}
                        onClick={() => setDisplayImage(image)}
                      />
                    </div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleImageUpdate(index);
                      }}
                    >
                      Update
                    </button>
                  </React.Fragment>
                ))}
              </div>

              <button className="right-img-btn" onClick={() => scroll(50)}>
                <IoIosArrowDropright />
              </button>
            </div>
          </section>
        </>
      ) : (
        // !WORKING: ITEM EDIT ===================================
        <>
          <section className="item-details__top-section">
            {displayImage && (
              <img src={displayImage} alt="Top" className="item__image" />
            )}
          </section>

          <section className="select-img__section--wrapper">
            <div className="select-img__section">
              <button className="left-img-btn" onClick={() => scroll(-50)}>
                <IoIosArrowDropleft />
              </button>

              <div ref={imageGroupRef} className="select-img__group">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="select-img"
                    onClick={() => setDisplayImage(image)}
                  >
                    <img
                      className="item__image"
                      src={image}
                      alt={`Selected ${index}`}
                    />
                  </div>
                ))}
              </div>

              <button className="right-img-btn" onClick={() => scroll(50)}>
                <IoIosArrowDropright />
              </button>
            </div>
          </section>

          <section className="choose-file__container">
            <input
              className="choose-file__input"
              placeholder="Upload Image"
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              multiple
            />
          </section>
        </>
      )}
    </>
  );
}
