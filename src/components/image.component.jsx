import { useState } from "react";

const Image = function () {
  let [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
  );

  const imageHandler = function (e) {
    // FileReader class reads data related to a file
    const reader = new FileReader();
    const file = e.target.files[0];
    // is filed when reader has finished reading the file
    reader.addEventListener("load", function () {
      if (reader.readyState === 2) {
        setImage(reader.result); // reader -> e.target
        console.log(reader.result);
      }
    });
    reader.readAsDataURL(file);
  };

  const dragStartHandler = function () {};

  const draggingHandler = function () {};

  const dragEndHandler = function () {};

  return (
    <div>
      <img
        src={image}
        alt="Upload"
        id="uploaded-image"
        onChange={imageHandler}
        onMouseDown={dragStartHandler}
        onMouseMove={draggingHandler}
        onMouseUp={dragEndHandler}
      />
    </div>
  );
};

export default Image;
