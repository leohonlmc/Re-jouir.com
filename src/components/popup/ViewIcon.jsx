import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../Header.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ViewIcon = ({ setShowPopup, ...props }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [currIndex, setCurrIndex] = useState(props.currIndex);
  const images = props.images;

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
  };

  return (
    <div>
      {isPopupVisible && (
        <div className="popup">
          <div
            className="d-flex"
            style={{
              width: "100%",
              padding: "24px 24px 0px 24px",
              height: "100%",
            }}
          >
            <div style={{ width: "100%" }}>
              <div
                onClick={() => setShowPopup(false)}
                style={{
                  height: "74vh",
                  maxWidth: "100%",
                  objectFit: "contain",
                  padding: "10px",
                }}
                className="image-section"
              >
                <LazyLoadImage
                  src={images[currIndex]}
                  className="card-img-top"
                  style={{
                    height: "97%",
                    objectFit: "contain",
                  }}
                  alt="..."
                  onClick={() => setShowPopup(true)}
                />

                <p style={{ margin: "0px", textAlign: "center" }}>
                  {props.caption}
                </p>
              </div>

              <div className="all-card-img-section">
                <div className="all-card-img-sub-section">
                  {props.images.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={item}
                        alt="..."
                        onClick={() => {
                          setCurrIndex(index);
                        }}
                        className="images-section-curr"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="ml12 aside-cta flex--item print:d-none"
              onClick={closePopup}
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ cursor: "pointer" }}
                size="lg"
              />
            </div>
          </div>
        </div>
      )}

      {isPopupVisible && <div className="overlay"></div>}

      <style>
        {`
          .popup {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            width: 100%;
            height: 100%;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px; /* Adjust as needed */
          }

          .popup h2 {
            margin-bottom: 10px;
          }

          .popup p {
            margin-bottom: 20px;
          }

          .popup button {
            padding: 7px 10px;
            background-color: rgb(0, 213, 255);
            font-weight: bold;
            
          }

          .popup button:hover {
            background-color: rgb(1, 185, 222);
          }

          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9998;
          }

        `}
      </style>
    </div>
  );
};

export default ViewIcon;
