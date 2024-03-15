import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../Account.scoped.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

const Login = ({ setShowPopup, ...props }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const id = localStorage.getItem("id");
  const name = localStorage.getItem("name");

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
  };

  const createUser = async () => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/api/user`,
        {
          id: localStorage.getItem("id"),
          name: localStorage.getItem("name"),
          given_name: localStorage.getItem("given_name"),
          family_name: localStorage.getItem("family_name"),
          email: localStorage.getItem("email"),
          picture: localStorage.getItem("picture"),
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (data) {
        console.log("User created");
        window.location.reload();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="popupwindow">
      {isPopupVisible && (
        <div className="popup-login">
          <div
            className="login-window"
            style={{
              padding: "24px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <div className="close-btn-div" onClick={closePopup}>
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
            {id ? (
              <div style={{ width: "100%" }}>
                <h2>Hi {name}!</h2>
                <br />
                <p>
                  How's your day? <br /> We hope Rejouir brings you good vibes
                  and good energy!
                </p>
                <br />
                {/* 
                <hr />

                <br />

                <h3>Your bookmark</h3>

                <br /> */}

                <button
                  className="btn logout"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <h2>Sign in with email</h2>
                <p>Currently we only offer Google login at this moment.</p>

                <div style={{ marginTop: "16px" }}>
                  <GoogleLogin
                    style={{ width: "100%" }}
                    onSuccess={(credentialResponse) => {
                      var decoded = jwtDecode(credentialResponse.credential);

                      localStorage.setItem("id", decoded.sub);
                      localStorage.setItem("name", decoded.name);
                      localStorage.setItem("given_name", decoded.given_name);
                      localStorage.setItem("family_name", decoded.family_name);
                      localStorage.setItem("email", decoded.email);
                      localStorage.setItem("picture", decoded.picture);
                      createUser();
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    useOneTap
                  />

                  <hr style={{ margin: "16px 0px" }} />

                  <div>
                    <h3 style={{ marginBottom: "16px" }}>
                      Once you join with us...
                    </h3>
                    <p>1. Your name showing in your post.</p>
                    {/* <p>2. You can save your favorite posts.</p> */}
                    <p>2. Get regular updates from our Santa's team!</p>
                    <p>3. Promotions & Prizes will get from our events!</p>
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
