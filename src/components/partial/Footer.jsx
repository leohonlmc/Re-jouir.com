import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
// faPaperPlane
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import "../../Footer.css";

function Footer() {
  return (
    <footer className="footer-area section-py-80">
      <div className="row justify-content-center footer">
        <div
          className="col-xl-5 col-lg-7 col-md-9 col-sm-11"
          style={{ position: "relative" }}
        >
          <img
            className="object"
            src="/assets/img/objects/circle-01.png"
            alt="object"
            style={{
              position: "absolute",
              bottom: "-15%",
              right: "30%",
              width: "24px",
            }}
          ></img>
          <img
            className="object"
            src="/assets/img/objects/circle-03.png"
            alt="object"
            style={{
              position: "absolute",
              bottom: "-70%",
              left: "20%",
              width: "24px",
            }}
          ></img>
          <div className="footer__info text-center">
            <div className="footer-logo">
              <img src="/R_white.png" alt="" style={{ width: "250px" }} />
            </div>
            <p>
              We make Christmas one step closer around the globe, and share your
              precious moment.
            </p>

            <ul className="list-wrap footer__social">
              <li>
                <a
                  style={{ color: "white" }}
                  href="https://www.instagram.com/rejouirxmas"
                  alt="ig"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{ color: "#a8b6ca" }}
                    size="2xl"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:rejouirxmas@gmail.com"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    style={{ color: "#a8b6ca" }}
                    size="2xl"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright__wrapper">
          <div className="row">
            <div className="col-md-6">
              <div className="copyright__text">
                <p>
                  © {new Date().getFullYear()} Rejouir. All rights reserved.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="copyright__menu">
                <ul className="list-wrap">
                  <li>
                    <a href="/#/about">About us</a>
                  </li>
                  <li>
                    <a href="/#/terms">Terms & Conditions</a>
                  </li>
                  <li className="backTop">
                    <a href="/#/privacy">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
