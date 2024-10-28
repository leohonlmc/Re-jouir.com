import "./About.scoped.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/partial/Header/Header";
import Footer from "../../components/partial/Footer/Footer";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="About">
      <div className="header-section-about">
        <Header title={t("about_us_title")} page="about" />

        <Helmet>
          <link rel="canonical" href="https://www.rejouirxmas.com/about" />
        </Helmet>

        <div className="center-text">
          <h1 className="about-réjouir">
            <strong>
              {t("about")} <span className="r-logo">R</span>éjouir
            </strong>
          </h1>
        </div>
      </div>
      <div className="about-main">
        <p>{t("about_paragraph_1")}</p>
        <p>{t("about_paragraph_2")}</p>

        <h2>{t("share_and_cherish")}</h2>
        <p>{t("share_and_cherish_paragraph")}</p>

        <h2>{t("connect_the_globe")}</h2>
        <p>{t("connect_the_globe_paragraph")}</p>

        <h2>{t("guest_visit")}</h2>
        <p>{t("guest_visit_paragraph")}</p>

        <p>{t("about_paragraph_3")}</p>

        <p>
          {t("founded_and_developed_by")}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/ming-chun-hon-aa12881b2/"
          >
            Leo Hon
          </a>
          . {t("designed_and_directed_by")}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/berry-kky/"
          >
            Berry Kwan
          </a>
          .
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
