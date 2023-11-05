import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="container-footer container text-center my-6 p-8 text-gray3">
      {/* <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full"></div> */}

      <div className="py-3">
        <img src="/R.png" alt="" style={{ width: "130px" }} />
      </div>
      <a
        style={{ color: "white" }}
        href="https://www.instagram.com/rejouirxmas"
        alt="ig"
      >
        Follow our Instagram page for more content!{" "}
        <FontAwesomeIcon
          icon={faInstagram}
          style={{ color: "#ffbb00" }}
          size="xl"
        />{" "}
      </a>

      <div className="py-3 footer-normal">
        <Link to="/about">
          <a href="/" className="info">
            About{" "}
            <strong>
              <span className="r-logo">R</span>éjouir
            </strong>
          </a>
        </Link>

        <Link to="/terms">
          <a href="/" className="info">
            Terms & Conditions
          </a>
        </Link>

        <Link to="/privacy">
          <a href="/" className="info">
            Privacy Policy
          </a>
        </Link>
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
