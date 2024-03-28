// ! Revisit: Refactor and Comment
// Import React Hooks
import { useState, useEffect, useRef } from "react";

import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export default function ImagePreview() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [topImage, setTopImage] = useState(null);
  const imageGroupRef = useRef(null);

  // useEffect(() => {
  //   console.log("selectedImages", selectedImages);
  //   console.log("imageGroupRef", imageGroupRef);
  // }, [selectedImages]);

  const scroll = (scrollOffset) => {
    if (imageGroupRef.current) {
      imageGroupRef.current.scrollBy(scrollOffset, 0);
    }
  };

  const handleImageChange = (e) => {
    // console.log("handleImageChange");
    const newFiles = Array.from(e.target.files);
    const newImages = newFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          //   console.log("reader.onloadend", reader.result);
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages)
      .then((newDataUrls) => {
        // console.log("Promise.all", newDataUrls);
        setSelectedImages((prevImages) => [...prevImages, ...newDataUrls]);
        setTopImage(newDataUrls[0]);
      })
      .catch((error) => {
        console.error("Error reading image files:", error);
      });
  };

  const handleImageClick = (image) => {
    setTopImage(image); // Set the top image to the clicked image
  };

  return (
    <>
      <section className="item-details__top-section">
        {topImage && <img src={topImage} alt="Top" className="item__image" />}
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
                onClick={() => handleImageClick(image)}
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
