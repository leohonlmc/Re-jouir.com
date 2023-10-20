import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="container-footer container text-center my-6 p-8 text-gray3">
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full"></div>

      <div className="py-3">
        <img src="/R.png" alt="" style={{ width: "130px" }} />
        {/* <p className="footer-brand-name">Réjouir.com</p> */}
      </div>

      {/* <a
          href="https://www.instagram.com/theswebuilder/"
          className="instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            size="2xl"
            style={{ marginBottom: "10px", width: "45px", height: "45px" }}
          />
        </a>

        <br />
        <br /> */}

      <div className="py-3 footer-normal">
        <a href="/#/about" className="info">
          About{" "}
          <strong>
            <span className="r-logo">R</span>éjouir
          </strong>
        </a>

        <a href="/terms" className="info">
          Terms & Conditions
        </a>

        <a href="/privacy" className="info">
          Privacy Policy
        </a>
      </div>

      <div
        className="text-xs"
        style={{ fontSize: "0.8rem", color: "white", fontWeight: "bold" }}
      >
        {`Copyright © ${new Date().getFullYear()}`} <strong>Réjouir.com</strong>
      </div>
    </footer>
  );
}

export default Footer;
