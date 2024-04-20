import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../Header.scoped.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import formatDateString from "../functions/formatDateString";

const { REACT_APP_AWS } = process.env;

const ViewIcon = ({ setShowPopup, ...props }) => {
  const countryEmojiMap = {
    Global: "🌍",
    Argentina: "🇦🇷",
    Australia: "🇦🇺",
    Austria: "🇦🇹",
    Belgium: "🇧🇪",
    Brazil: "🇧🇷",
    Canada: "🇨🇦",
    Chile: "🇨🇱",
    Colombia: "🇨🇴",
    "Costa Rica": "🇨🇷",
    Denmark: "🇩🇰",
    Ecuador: "🇪🇨",
    Finland: "🇫🇮",
    France: "🇫🇷",
    Germany: "🇩🇪",
    Greece: "🇬🇷",
    Hungary: "🇭🇺",
    "Hong Kong SAR": "🇭🇰",
    Iceland: "🇮🇸",
    India: "🇮🇳",
    Indonesia: "🇮🇩",
    Ireland: "🇮🇪",
    Italy: "🇮🇹",
    Jamaica: "🇯🇲",
    Japan: "🇯🇵",
    Kenya: "🇰🇪",
    Lebanon: "🇱🇧",
    Luxembourg: "🇱🇺",
    Mexico: "🇲🇽",
    Netherlands: "🇳🇱",
    "New Zealand": "🇳🇿",
    Norway: "🇳🇴",
    Panama: "🇵🇦",
    Peru: "🇵🇪",
    Philippines: "🇵🇭",
    Poland: "🇵🇱",
    Portugal: "🇵🇹",
    "Puerto Rico": "🇵🇷",
    Romania: "🇷🇴",
    Russia: "🇷🇺",
    "South Africa": "🇿🇦",
    "South Korea": "🇰🇷",
    Spain: "🇪🇸",
    Sweden: "🇸🇪",
    Switzerland: "🇨🇭",
    Turkey: "🇹🇷",
    Taiwan: "🇹🇼",
    Ukraine: "🇺🇦",
    "United Kingdom": "🇬🇧",
    "United States": "🇺🇸",
    Venezuela: "🇻🇪",
    Zimbabwe: "🇿🇼",
  };
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [currIndex, setCurrIndex] = useState(props.currIndex);
  const images = props.images;

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
  };

  return (
    <div className="popupwindow">
      {isPopupVisible && (
        <div className="popup">
          <div
            className="d-flex"
            style={{
              width: "100%",
              padding: "20px 10px 0px 10px",
              height: "100%",
            }}
          >
            <div style={{ width: "100%", height: "75%" }}>
              <div
                onClick={() => setShowPopup(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                className="image-section"
              >
                <LazyLoadImage
                  src={
                    images[currIndex].slice(0, 4) !== "http"
                      ? `${REACT_APP_AWS}${images[currIndex]}`
                      : images[currIndex]
                  }
                  className="card-img-top"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  alt="..."
                  onClick={() => setShowPopup(true)}
                />
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
                        src={
                          item.slice(0, 4) !== "http"
                            ? `${REACT_APP_AWS}${item}`
                            : item
                        }
                        alt="..."
                        onClick={() => {
                          setCurrIndex(index);
                        }}
                        className={
                          index === currIndex
                            ? `images-section-curr n${currIndex}`
                            : "images-section-curr"
                        }
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
                style={{
                  cursor: "pointer",
                  padding: "5px 8px",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  color: "white",
                }}
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
            top: 0%;
            left: 0%;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            width: 100%;
            height: 100%;
            animation: popupAnimation 0.2s ease-in-out forwards;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
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
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 9998;
          }

          @keyframes popupAnimation {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ViewIcon;
