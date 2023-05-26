import React, { useRef } from "react";
const Graphics_Browser: React.FC = () => {
  const constantPictures = [
    "https://images.pexels.com/photos/2014424/pexels-photo-2014424.jpeg",
    "https://images.pexels.com/photos/2014423/pexels-photo-2014423.jpeg",
    "https://images.pexels.com/photos/2014421/pexels-photo-2014421.jpeg",
    "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
    "https://images.pexels.com/photos/2014420/pexels-photo-2014420.jpeg",
    "https://images.pexels.com/photos/2014419/pexels-photo-2014419.jpeg",
    "https://images.pexels.com/photos/2014418/pexels-photo-2014418.jpeg",
  ];

  const imageSize = {
    width: "100px",
    height: "100px",
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // Handle the selected files here
    console.log(files);
  };

  const handleBrowseClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <div className="browser">
      <input
        type="file"
        id="file"
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={handleFileInput}
        multiple
      />
      <button onClick={handleBrowseClick}>Browse</button>
      {constantPictures.map((picture, index) => (
        <img
          key={index}
          src={picture}
          alt={`Image ${index + 1}`}
          style={imageSize}
        />
      ))}
    </div>
  );
};

export default Graphics_Browser;
