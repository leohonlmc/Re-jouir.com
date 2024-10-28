import "../About/About.scoped.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/partial/Header/Header";
import Footer from "../../components/partial/Footer/Footer";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function Terms() {
  const { t } = useTranslation();

  return (
    <div className="About">
      <div className="header-section-about">
        <Header title={t("terms_title")} page="privacy" />

        <Helmet>
          <link rel="canonical" href="https://www.rejouirxmas.com/terms" />
        </Helmet>

        <div className="center-text">
          <h1 className="about-réjouir">
            <strong>{t("terms_and_conditions")}</strong>
          </h1>
        </div>
      </div>
      <div className="about-main">
        <p>
          <strong>{t("last_updated", { date: "20 Oct 2023" })}</strong>
        </p>

        <p>
          {t("terms_intro_1")}{" "}
          <strong style={{ fontSize: "20px" }}>
            <span className="r-logo">R</span>éjouir
          </strong>
          . {t("terms_intro_2")}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.rejouirxmas.com/"
          >
            Rejouirxmas.com
          </a>{" "}
          {t("terms_intro_3")}{" "}
          <strong style={{ fontSize: "20px" }}>
            <span className="r-logo">R</span>éjouir
          </strong>{" "}
          ({t("us_we_our")}).
        </p>

        <h2>{t("agreement_to_terms")}</h2>
        <p>{t("agreement_to_terms_desc")}</p>

        <h2>{t("changes_to_terms")}</h2>
        <p>{t("changes_to_terms_desc")}</p>

        <h2>{t("termination")}</h2>
        <p>{t("termination_desc")}</p>

        <h2>{t("feedback_and_contact")}</h2>
        <p>
          {t("feedback_and_contact_desc")}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:rejouirxmas@gmail.com"
          >
            gmail
          </a>
          .
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
