import "./Shop.scoped.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/partial/Header/Header";
import Footer from "../../components/partial/Footer/Footer";
import Login from "../../components/popup/Login";
import {} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function Shop() {
  const { t } = useTranslation();
  const id = localStorage.getItem("id");
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="Shop background main">
      <Header title={t("shop_title")} page="shop" />

      {showPopup && <Login setShowPopup={setShowPopup} />}

      <div className="shop-main">
        <div className="avatar-page-div">
          <div className="avartar-title">
            <h1>{t("avatar_title")}</h1>
          </div>
        </div>

        <div className="avartars-div row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="avartar col-lg-3 col-md-4 col-sm-6 col-12 p-0">
            <div className="avartar-icon-div">
              <div className="avartar-div">
                <img
                  className="avartar-icon"
                  src="/hat.png"
                  alt={t("avatar_hat_alt")}
                />
              </div>
              <div className="icon-shape"></div>
            </div>
            <div className="avartar-des">
              <h3 className="avartar-name">{t("avatar_hat_name")}</h3>
              {id ? (
                <button className="avartar-price-btn">{t("claimed")}</button>
              ) : (
                <button
                  className="avartar-price-btn"
                  onClick={() => setShowPopup(true)}
                >
                  {t("sign_up_to_claim")}
                </button>
              )}
            </div>
          </div>

          <div className="avartar col-lg-3 col-md-4 col-sm-6 col-12 p-0">
            <div className="avartar-icon-div">
              <h1 className="coming-soon-title">{t("coming_soon")}</h1>
            </div>
            <div className="avartar-des">
              <h3 className="avartar-name">{t("coming_soon")}</h3>
              {id ? (
                <button className="avartar-price-btn">{t("claimed")}</button>
              ) : (
                <button className="avartar-price-btn">{t("stay_tuned")}</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
