import "../../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faMapLocationDot,
  faCloudArrowUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function ShareMoment() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="d-flex flex-box">
        <div className="feature-img">
          <img src="/moment-2.png" alt={t("share_moment_img_alt")} />
        </div>
        <div className="feature right">
          <div className="feature-child">
            <div className="section__title text-start">
              <span className="sub-title tg-text-gradient">
                {t("capture_and_share")}
              </span>
              <h2 className="title">{t("share_your_moment")}</h2>
            </div>

            <p className="share-moment-text">{t("share_moment_text")}</p>

            <div className="about__facts-list">
              <div className="about__icon-box">
                <div className="icon">
                  <FontAwesomeIcon icon={faImages} size="sm" />
                </div>
                <p>{t("share_moment_step_1")}</p>
              </div>
              <div className="about__icon-box">
                <div className="icon">
                  <FontAwesomeIcon icon={faMapLocationDot} size="sm" />
                </div>
                <p>{t("share_moment_step_2")}</p>
              </div>

              <div className="about__icon-box">
                <div className="icon">
                  <FontAwesomeIcon
                    icon={faStar}
                    size="sm"
                    color="white"
                    className="fa-star-white"
                  />
                </div>
                <p>{t("share_moment_step_3")}</p>
              </div>

              <div className="about__icon-box">
                <div className="icon cloud">
                  <FontAwesomeIcon icon={faCloudArrowUp} size="sm" bounce />
                </div>
                <p>{t("share_moment_step_4")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareMoment;
