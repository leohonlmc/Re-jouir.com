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
            src="/R.png"
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt=""
          />
        </a>

        <div className="navbar-nav">
          <Link
            to={"/list"}
            style={{ textDecoration: "none" }}
            className="nav-item nav-link active"
          >
            Upload
          </Link>
          <Link
            to={"/blog"}
            style={{ textDecoration: "none" }}
            className="nav-item nav-link active blog"
          >
            Blog <span className="sr-only">(current)</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
