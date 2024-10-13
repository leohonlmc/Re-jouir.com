import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import "./Footer.scoped.css";

function Footer() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language;

  return (
    <footer className="text-center text-lg-start">
      <section className="">
        <div className="container text-center text-md-start ">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <img
                src="/R_white.png"
                alt=""
                style={{ width: "100px", marginBottom: "10px" }}
              />

              <p>
                Share your love for Christmas with Réjouir. We provide the best
                Christmas experience for you and your loved ones.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Company</h6>
              <p>
                <a href={`/#/${currentLang}/about`}>{t("about")}</a>
              </p>
              <p>
                <a href={`/#/${currentLang}/privacy`}>{t("privacy_policy")}</a>
              </p>
              <p>
                <a href={`/#/${currentLang}/terms`}>{t("terms_conditions")}</a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:rejouirxmas@gmail.com"
              >
                <i className="fas fa-envelope me-3"></i>
                rejouirxmas@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4 row"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <div className="col-6 text-left">
          © 2024 Copyright:
          <span className="text-reset fw-bold" href="https://mdbootstrap.com/">
            rejouirxmas.com
          </span>
        </div>

        <div className="col-6 text-right">
          <a
            href="https://www.instagram.com/rejouirxmas"
            className="me-4 text-reset"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
