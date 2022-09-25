import { useState } from "react";
const Canvas = function () {
  const [image, setImage] = useState("");
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [styles, setStyles] = useState({});

  // updates the image in the imag tag
  const imageHandler = function (e) {
    // FileReader class reads data related to a file
    const reader = new FileReader();
    const file = e.target.files[0];
    // is filed when reader has finished reading the file
    reader.addEventListener("load", function () {
      if (reader.readyState === 2) {
        setImage(reader.result); // reader -> e.target
      }
    });
    reader.readAsDataURL(file);
  };

  const dragStartHandler = function (e) {
    setDiffX(e.screenX - e.target.getBoundingClientRect().left);
    setDiffY(e.screenY - e.target.getBoundingClientRect().top);
    setDragging(true);
  };

  const draggingHandler = function (e) {
    if (dragging) {
      // calculating new position of image relative to the cursor
      const left = e.screenX - diffX;
      const top = e.screenY - diffY;

      // setting new positioning to image
      setStyles({
        left: left,
        top: top,
      });
    }
  };

  const dragEndHandler = function () {
    setDragging(false);
  };

  const removeHandler = () => setImage("");

  return (
    <div className="canvas-container">
      <div>
        <img
          src={image}
          alt="Upload"
          id="uploaded-image"
          className={image === "" ? "img-hidden" : "img-visible"}
          style={styles}
          onMouseDown={dragStartHandler}
          onMouseMove={draggingHandler}
          onMouseUp={dragEndHandler}
        />
      </div>
      <div className="image-upload-container">
        <input
          type="file"
          name="image-upload"
          accept="image/*"
          id="image"
          onChange={imageHandler}
        />
      </div>
      <div>
        <button onClick={removeHandler}>Remove</button>
      </div>
    </div>
  );
};

export default Canvas;
