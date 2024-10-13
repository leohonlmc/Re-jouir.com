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
    <footer class="text-center text-lg-start">
      <section class="">
        <div class="container text-center text-md-start ">
          <div class="row mt-3">
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
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

            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Company</h6>
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

            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:rejouirxmas@gmail.com"
              >
                <i class="fas fa-envelope me-3"></i>
                rejouirxmas@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <div
        class="text-center p-4 row"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <div class="col-6 text-left">
          © 2024 Copyright:
          <span class="text-reset fw-bold" href="https://mdbootstrap.com/">
            rejouirxmas.com
          </span>
        </div>

        <div class="col-6 text-right">
          <a
            href="https://www.instagram.com/rejouirxmas"
            class="me-4 text-reset"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
