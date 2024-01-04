import React, { useState } from "react";

export const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const displayImage = () => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      return (
        <div>
          <h3> Uploaded Exercise :</h3>
          <img
            src={imageUrl}
            alt="Uploaded Exercise"
            style={{
              margin: "0 0 0 500px",
              maxWidth: "100%",
              maxHeight: "300px",
            }}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {selectedImage ? (
        displayImage()
      ) : (
        <h1>its better to learn with an image</h1>
      )}
    </div>
  );
};
