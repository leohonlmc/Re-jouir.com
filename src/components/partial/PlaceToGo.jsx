import "../../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PlaceToGo() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = lang || i18n.language;
  const navigate = useNavigate();

  const data = [
    {
      country: t("united_states"),
      city: t("new_york"),
      place: t("place_usa"),
      class: "ny",
    },
    {
      country: t("france"),
      city: t("strasbourg"),
      place: t("place_france"),
      class: "fr",
    },
    {
      country: t("united_kingdom"),
      city: t("edinburgh"),
      place: t("place_uk"),
      class: "uk",
    },
  ];

  const search = function (query) {
    navigate(`/${currentLang}/blog`);
    localStorage.setItem("selectedCountry", query);
  };

  return (
    <div className="countries row">
      <div className="section__title text-start">
        <h2
          className="title"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          <span className="tg-text-gradient">{t("place_to_go")}</span>
        </h2>
      </div>

      {data.map((item, index) => (
        <div
          className={`col-lg-3 col-md-4 col-sm-6 col-12 country-review ${item.class}`}
          key={index}
          onClick={() => search(item.country)}
        >
          <div>
            <h4>{item.country}</h4>
            <h5>{item.city}</h5>
            <p>{item.place}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaceToGo;
