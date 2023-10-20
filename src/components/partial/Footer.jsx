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
      {/* 
        <a href="/about" className="footer-intro-link">
          About
        </a>

        <a href="/contactme" className="footer-intro-link">
          Contact Me
        </a>

        <br />
        <br /> */}

      {/* <div className="py-3 footer-normal">
          <a href="/terms" className="contact-me-nav">
            Terms & Conditions
          </a>
          <a href="/privacy" className="contact-me-nav">
            Privacy Policy
          </a>

          <br />
          <br />
        </div> */}

      <div
        className="text-xs"
        style={{ fontSize: "0.8rem", color: "white", fontWeight: "bold" }}
      >
        Copyright © 2023 <strong>Réjouir.com</strong> <br />
      </div>
    </footer>
  );
}

export default Footer;
