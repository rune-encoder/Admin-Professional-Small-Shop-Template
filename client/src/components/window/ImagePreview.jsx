// ! Revisit: Refactor and Comment
// Import React Hooks
import { useRef } from "react";

import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export default function ImagePreview({
  selectedImages,
  displayImage,
  handleImageChange,
  setDisplayImage,
}) {
  const imageGroupRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (imageGroupRef.current) {
      imageGroupRef.current.scrollBy(scrollOffset, 0);
    }
  };

  return (
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
          onChange={handleImageChange}
          multiple
        />
      </section>
    </>
  );
}
