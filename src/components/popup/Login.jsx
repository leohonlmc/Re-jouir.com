import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../Account.scoped.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import GoogleLoginDiv from "./GoogleLogin";
import { useTranslation } from "react-i18next";

const Login = ({ setShowPopup, ...props }) => {
  const { t } = useTranslation();
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const id = localStorage.getItem("id");
  const name = localStorage.getItem("name");

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
  };

  return (
    <div className="popupwindow">
      {isPopupVisible && (
        <div className="popup-login">
          <div
            className="login-window p-8"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <div className="close-btn-div" onClick={closePopup}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{
                  cursor: "pointer",
                }}
                size="2xl"
              />
            </div>
            {id ? (
              <div style={{ width: "100%" }}>
                <h2>{t("hi_user", { name })}!</h2>
                <br />
                <p>{t("welcome_message")}</p>
                <br />

                <button
                  className="btn logout"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <h2>{t("sign_in_with_google")}</h2>

                <div style={{ marginTop: "16px" }}>
                  <GoogleLoginDiv />

                  <hr style={{ margin: "16px 0px" }} />

                  <div>
                    <h3 style={{ marginBottom: "16px" }}>
                      {t("join_benefits")}
                    </h3>
                    <p>{t("benefit_1")}</p>
                    <p>{t("benefit_2")}</p>
                    <p>{t("benefit_3")}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isPopupVisible && <div className="overlay"></div>}

      <style>
        {`
          .popup-login {
            position: fixed;
            z-index: 9999;
            animation: popupAnimation 0.2s ease-in-out forwards;
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 200px;
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
        `}
      </style>
    </div>
  );
};

export default Login;
