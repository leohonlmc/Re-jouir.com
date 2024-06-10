import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import "../../Footer.scoped.css";

function Footer() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language;

  return (
    <footer className="footer-area section-py-80">
      <div className="row justify-content-center footer">
        <div
          className="col-xl-5 col-lg-7 col-md-9 col-sm-11"
          style={{ position: "relative" }}
        >
          <div className="footer__info text-center">
            <div className="footer-logo">
              <img src="/R_white.png" alt="" style={{ width: "250px" }} />
            </div>
            {/* <p>
              {t("footer_description")}
            </p> */}

            <ul className="list-wrap footer__social">
              <li>
                <a
                  style={{ color: "white" }}
                  href="https://www.instagram.com/rejouirxmas"
                  alt="ig"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{ color: "white" }}
                    size="2xl"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:rejouirxmas@gmail.com"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    style={{ color: "white" }}
                    size="2xl"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright__wrapper">
          <div className="row">
            <div className="col-md-6">
              <div className="copyright__text">
                <p>
                  © {new Date().getFullYear()} Réjouir.{" "}
                  {t("all_rights_reserved")}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="copyright__menu">
                <ul className="list-wrap">
                  <li>
                    <a href={`/#/${currentLang}/about`}>{t("about")}</a>
                  </li>
                  <li>
                    <a href={`/#/${currentLang}/terms`}>
                      {t("terms_conditions")}
                    </a>
                  </li>
                  <li className="backTop">
                    <a href={`/#/${currentLang}/privacy`}>
                      {t("privacy_policy")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
