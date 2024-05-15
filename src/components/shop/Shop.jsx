import "./Shop.scoped.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../partial/Header";
import Footer from "../partial/Footer";
import Login from "../popup/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

function Shop() {
  const id = localStorage.getItem("id");
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="Shop background">
      <Header />

      {showPopup && <Login setShowPopup={setShowPopup} />}

      <div className="shop-main">
        <div className="avatar-page-div">
          <div className="avartar-title">
            <h1>Avartar</h1>
          </div>
        </div>

        <div className="avartars-div row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="avartar col-lg-3 col-md-4 col-sm-6 col-12 p-0">
            <div className="avartar-icon-div">
              <div className="avartar-div">
                <img
                  className="avartar-icon"
                  src="/hat.png"
                  alt="avartar-hat"
                />
              </div>
              <div className="icon-shape"></div>
            </div>
            <div className="avartar-des">
              <h3 className="avartar-name">Santa's hat</h3>
              {id ? (
                <button className="avartar-price-btn">Claimed</button>
              ) : (
                <button
                  className="avartar-price-btn"
                  onClick={() => setShowPopup(true)}
                >
                  Sign up to claim
                </button>
              )}
            </div>
          </div>

          <div className="avartar col-lg-3 col-md-4 col-sm-6 col-12 p-0">
            <div className="avartar-icon-div">
              <h1 className="coming-soon-title">Coming soon</h1>
            </div>
            <div className="avartar-des">
              <h3 className="avartar-name">Coming soon</h3>
              {id ? (
                <button className="avartar-price-btn">Claimed</button>
              ) : (
                <button className="avartar-price-btn">Stay tuned</button>
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
