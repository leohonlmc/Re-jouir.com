import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../../Header.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ViewIcon = ({ setShowPopup, ...props }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

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

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
  };

  const allUpload = props.allUpload;

  return (
    <div className="popupwindow">
      {isPopupVisible && (
        <div className="popup" onClick={closePopup}>
          <div
            className="d-flex"
            style={{
              width: "100%",
              height: "100%",
              padding: "24px 24px 10px 24px",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <div className="col-lg-12">
              <div className="d-flex">
                <div className="images-section">
                  <div
                    className="ecommerce-gallery"
                    data-mdb-zoom-effect="true"
                    data-mdb-auto-height="true"
                  >
                    <div className="row py-3 shadow-5">
                      <div className="col-9 mb-1">
                        <div className="new-post">
                          <img src="/new.png" alt="" />
                        </div>
                        <div className="lightbox">
                          <img
                            src={allUpload[0]}
                            alt=""
                            className="ecommerce-gallery-main-img active w-100 "
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        {allUpload.map((image, index) => (
                          <div className={`mb-1 mb-1${index}`} key={index}>
                            <div className="D_Qy-2">
                              <p
                                className="D_oz D_ov D_o_ D_oE D_oH D_oK D_oN D_oP"
                                style={{
                                  textAlign: "center",
                                  margin: "0px",
                                  fontSize: "11px",
                                  color: "white",
                                }}
                              >
                                {index + 1}
                              </p>
                            </div>
                            <LazyLoadImage
                              src={image}
                              alt=""
                              className={`active w-100`}
                              effect="blur"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog-info">
                  <div className="blog-info-child">
                    <div className="all-info-div">
                      <ul className="inline-list">
                        <li>
                          {countryEmojiMap[props.country]} {props.country}
                        </li>
                        <li>
                          <img
                            src="/google-map.png"
                            alt=""
                            style={{ width: "20px" }}
                          />
                          {props.location.length > 0 ? (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://www.google.com/maps?q=${encodeURIComponent(
                                props.location
                              )}`}
                              style={{ textDecoration: "none" }}
                            >
                              {props.location}
                            </a>
                          ) : (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://www.google.com/maps?q=${encodeURIComponent(
                                props.location
                              )}`}
                              style={{ textDecoration: "none" }}
                            >
                              Address?
                            </a>
                          )}
                        </li>
                        <li>🗓️ Now</li>
                      </ul>

                      <div className="container p-0">
                        <div className="row">
                          <div className="col-lg-2 col-md-3 p-0">
                            {props.rating > 3 ? (
                              <div className="rating-div green-rating">
                                <div>Rating</div>
                                <div className="text-xl leading-5 font-bold ">
                                  {props.rating.toFixed(1)}
                                </div>
                              </div>
                            ) : (
                              <div className="rating-div yellow-rating">
                                <div>Rating</div>
                                {!props.rating ? (
                                  <div className="text-xl leading-5 font-bold ">
                                    NA
                                  </div>
                                ) : (
                                  <div className="text-xl leading-5 font-bold ">
                                    {props.rating.toFixed(1)}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="col-lg-10 col-md-9 p-0">
                            {props.title.length > 0 ? (
                              <h4 className="m-0 p-2" style={{ margin: "0px" }}>
                                {props.title}
                              </h4>
                            ) : (
                              <h4 className="m-0 p-2" style={{ margin: "0px" }}>
                                Your title goes here!
                              </h4>
                            )}
                          </div>
                        </div>
                      </div>
                      {props.event ? (
                        <p
                          className="upload-event"
                          style={{ margin: "0px", textAlign: "left" }}
                        >{`Event: ${props.event}`}</p>
                      ) : (
                        <p
                          className="upload-event"
                          style={{ margin: "0px", textAlign: "left" }}
                        >{`Event: event goes here!`}</p>
                      )}

                      {props.description.length > 0 ? (
                        <p
                          className="upload-description"
                          style={{ margin: "0px", textAlign: "left" }}
                        >
                          {props.description}
                        </p>
                      ) : (
                        <p
                          className="upload-description"
                          style={{ margin: "0px", textAlign: "left" }}
                        >
                          Description goes here!
                        </p>
                      )}
                    </div>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div className="liked-btn-div">
                        <FontAwesomeIcon
                          className="like-btn"
                          icon={faHeart}
                          style={{
                            color: "grey",
                            marginRight: "0px",
                          }}
                          size="xl"
                        />{" "}
                        {`0 people like this`}
                      </div>
                    </div>
                  </div>
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

          <p style={{ marginBottom: "10px" }}>
            This will be the final design of your post ☝🏻
          </p>
        </div>
      )}

      {isPopupVisible && <div className="overlay" onClick={closePopup}></div>}

      <style>
        {`
          .popup {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 10%;
            left: 20%;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            width: 60%;
            animation: popupAnimation 0.2s ease-in-out forwards;
            border-radius: 10px;
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
            background-color: rgba(0, 0, 0, 0.5);
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

          @media only screen and (max-width: 1209px) {
            .popup {
                width: 100%;
                left: 0;
            }
          }

          @media only screen and (max-width: 768px) {
            .popup {
                top: 0;
                height: 100%;
                border-radius: 0px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ViewIcon;
