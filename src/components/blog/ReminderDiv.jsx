import "./Blog.scoped.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import GoogleLoginDiv from "../popup/GoogleLogin";
import { useTranslation } from "react-i18next";

function ReminderDiv() {
  const { t } = useTranslation();
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
          <h4>{t("signed_out")}</h4>
          <p>{t("sign_in_experience")}</p>

          <div className="google-login">
            <GoogleLoginDiv />
          </div>

          <p className="grey-color-text">
            {t("by_continuing")}{" "}
            <a className="terms" style={{ fontWeight: "bold" }} href="/#/terms">
              {t("terms_of_service")}
            </a>{" "}
            ; {t("acknowledge_privacy")}{" "}
            <a
              className="privacy"
              style={{ fontWeight: "bold" }}
              href="/#/privacy"
            >
              {t("privacy_policy")}
            </a>
            .
          </p>
        </div>
      ) : null}
    </>
  );
}

export default ReminderDiv;
