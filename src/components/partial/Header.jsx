import "../../Header.scoped.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Login from "../popup/Login";

function Header(props) {
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const picture = localStorage.getItem("picture");
  const id = localStorage.getItem("id");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="Header">
      <HelmetProvider>
        <Helmet>
          <title>{props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
      </HelmetProvider>

      {showPopup && <Login setShowPopup={setShowPopup} />}

      <nav
        className={`navbar navbar-expand-lg fixed-top navbar-light bg-light ${
          scrolled ? "white" : ""
        }`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/R.png"
              width="60"
              height="60"
              className="d-inline-block align-top"
              alt=""
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setScrolled(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-item nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-item nav-link active" to="/upload">
                  Upload
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-item nav-link active blog" to="/blog">
                  Blog
                </Link>
              </li>
            </ul>
            <div className="account-icon" onClick={() => setShowPopup(true)}>
              {id ? (
                <div>
                  <img
                    src={localStorage.getItem("picture")}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              ) : (
                <FontAwesomeIcon
                  className="account-icon-fort"
                  icon={faCircleUser}
                  size="2xl"
                />
              )}
            </div>
          </div>
        </div>
        {/* <div className="props">
          <img src="/props.png" alt="" />
        </div> */}
      </nav>
    </div>
  );
}

export default Header;
