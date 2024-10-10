import "../About/About.scoped.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/partial/Header";
import Footer from "../../components/partial/Footer";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="About">
      <div className="header-section-about">
        <Header title={t("privacy_policy_title")} page="terms" />

        <Helmet>
          <link rel="canonical" href="https://www.rejouirxmas.com/privacy" />
        </Helmet>

        <br />
        <br />
        <h1 className="about-réjouir">
          <strong>{t("privacy_policy")}</strong>
        </h1>
      </div>
      <div className="about-main">
        <p>
          <strong>{t("last_updated", { date: "20 Oct 2023" })}</strong>
        </p>

        <p>
          {t("welcome_to")}{" "}
          <strong style={{ fontSize: "20px" }}>
            <span className="r-logo">R</span>éjouir
          </strong>
          ! {t("privacy_policy_intro")}{" "}
          <strong style={{ fontSize: "20px" }}>
            <span className="r-logo">R</span>éjouir
          </strong>{" "}
          ({t("us_we_our")}) {t("collects_uses_discloses")}
        </p>

        <h2>{t("information_collection")}</h2>
        <p>{t("information_collection_desc")}</p>

        <h2>{t("how_we_use_your_information")}</h2>
        <p>{t("how_we_use_your_information_desc")}</p>

        <h2>{t("data_protection")}</h2>
        <p>{t("data_protection_desc")}</p>

        <h2>{t("third_party_services")}</h2>
        <p>{t("third_party_services_desc")}</p>

        <h2>{t("changes_to_privacy_policy")}</h2>
        <p>{t("changes_to_privacy_policy_desc")}</p>

        <h2>{t("contact_us")}</h2>
        <p>
          {t("contact_us_desc")}{" "}
          <a href="mailto:rejouirxmas@gmail.com">gmail</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Privacy;
