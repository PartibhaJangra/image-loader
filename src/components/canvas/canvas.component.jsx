import { useEffect, useState } from "react";

import Button from "../button/button.component.jsx";
import Image from "../image/image.component.jsx";
import Input from "../input/input.component.jsx";

import "./canvas.styles.css";

const Canvas = function () {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [styles, setStyles] = useState({});

  useEffect(() => {
    if (image) {
      // FileReader class reads data related to a file
      const reader = new FileReader();
      reader.addEventListener("loadend", function () {
        if (reader.readyState === 2) {
          setPreview(reader.result);
        }
      });
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const imageHandler = function (e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
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

  const removeHandler = () => {
    setImage();
  };

  return (
    <div className="canvas-container">
      <div className="image-container">
        <Image
          src={preview}
          alt="image_from_gallery"
          className={!image ? "img-hidden" : "img-visible"}
          style={styles}
          onMouseDown={dragStartHandler}
          onMouseMove={draggingHandler}
          onMouseUp={dragEndHandler}
        />
        {preview && (
          <Button onClick={removeHandler} id="remove-button">
            X
          </Button>
        )}
      </div>

      <div className="upload-input-container">
        <Input
          type="file"
          name="image-upload"
          accept="image/*"
          id="upload-input"
          onChange={imageHandler}
        />
        <label htmlFor="upload-input" id="upload-input-label">
          Upload Image
        </label>
      </div>
    </div>
  );
};

export default Canvas;
