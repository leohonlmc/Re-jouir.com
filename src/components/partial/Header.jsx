import "../../Header.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="Header">
      <HelmetProvider>
        <Helmet>
          <title>{props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
      </HelmetProvider>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img
            src="/R_white.png"
            width="110"
            height="35"
            className="d-inline-block align-top"
            alt=""
          />
        </a>

        <div className="navbar-nav">
          <Link to={"/blog"} style={{ textDecoration: "none" }}>
            <a className="nav-item nav-link active" href="#">
              Blog <span className="sr-only">(current)</span>
            </a>
          </Link>
          <Link to={"/list"} style={{ textDecoration: "none" }}>
            <a className="nav-item nav-link active" href="#">
              Upload
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
