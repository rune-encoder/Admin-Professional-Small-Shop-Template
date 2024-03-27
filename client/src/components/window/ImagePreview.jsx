// Import React Hooks
import { useState, useEffect, useRef } from "react";

export default function ImagePreview() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [topImage, setTopImage] = useState(null);

  useEffect(() => {
    console.log("selectedImages", selectedImages);
  }, [selectedImages]);

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
      <div className="test__top-section cbg">
        <section className="">
          {topImage && (
            <div className="img-cont">
              <img src={topImage} alt="Top" className="img-icon" />
            </div>
          )}
        </section>
      </div>

      <div className="test__middle-section cbg">
          <section className="t-img-sec">
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Selected ${index}`}
                width="50"
                height="50"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </section>

          <section className="t-input-sec">
            <input
              className=""
              placeholder="Image URL"
              id="image"
              type="file"
              name="image"
              onChange={handleImageChange}
              multiple
            />
          </section>
        </div>
    </>
  );
}
