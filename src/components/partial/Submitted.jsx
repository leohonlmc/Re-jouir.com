import React from "react";
import Footer from "../partial/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Submitted() {
  const navigate = useNavigate();
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = lang || i18n.language;

  const handleReturnToBlog = () => {
    navigate(`/${currentLang}/blog`);
  };

  return (
    <div className="Submitted" style={{ height: "80vh", textAlign: "center" }}>
      <div
        className="d-flex"
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          margin: "150px 0px 0px 0px",
        }}
      >
        <div>
          <h2>{t("thank_you_for_contribution")}</h2>
          <p>{t("santa_team_review")}</p>
        </div>
      </div>

      <button className="btn btn-success" onClick={handleReturnToBlog}>
        {t("return_to_blog")}
      </button>
    </div>
  );
}

export default Submitted;
