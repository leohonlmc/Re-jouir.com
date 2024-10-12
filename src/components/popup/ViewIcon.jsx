import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ViewIcon.scoped.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const { REACT_APP_AWS } = process.env;

const ViewIcon = ({
  setShowPopup,
  showPopup,
  currIndex,
  post,
  updateCurrentIndex,
}) => {
  if (!showPopup) {
    return null;
  }

  if (!post || !post.images) {
    return <div>Loading...</div>;
  }

  const images = post.images;

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="popupwindow">
      <div className="popup">
        <div className="image-section" onClick={closePopup}>
          <LazyLoadImage
            src={`${REACT_APP_AWS}${images[currIndex]}`}
            alt="Displayed Image"
            effect="blur"
            style={{
              maxHeight: "100%", // Limits the height of the image to 100% of its container
              maxWidth: "100%", // Limits the width of the image to 100% of its container
              objectFit: "contain", // Ensures the image maintains its aspect ratio
            }}
          />
        </div>
      </div>
      <div className="overlay" onClick={closePopup}></div>
    </div>
  );
};

export default ViewIcon;
