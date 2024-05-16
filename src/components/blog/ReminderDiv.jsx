import "./Blog.scoped.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import GoogleLoginDiv from "../popup/GoogleLogin";

function ReminderDiv() {
  const [closePopup, setClosePopup] = useState(false);

  return (
    <>
      {!closePopup ? (
        <div className="login-message-div p-8">
          <div
            onClick={() => {
              localStorage.setItem("close", "true");
              setClosePopup(true);
            }}
          >
            <FontAwesomeIcon
              className="close-google-login"
              icon={faXmark}
              size="2xl"
            />
          </div>
          <h4>You are signed out</h4>
          <p>Sign in to get the best experience</p>

          <div className="google-login">
            <GoogleLoginDiv />
          </div>

          <p className="grey-color-text">
            By continuing, you agree to Rejouir's{" "}
            <a className="terms" style={{ fontWeight: "bold" }} href="/#/terms">
              Terms of Service
            </a>{" "}
            ; Opens a new tab and acknowledge you've read our{" "}
            <a
              className="privacy"
              style={{ fontWeight: "bold" }}
              href="/#/privacy"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      ) : null}
    </>
  );
}

export default ReminderDiv;
