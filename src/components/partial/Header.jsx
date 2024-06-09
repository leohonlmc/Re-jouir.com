import "../../Header.scoped.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Login from "../popup/Login";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const picture = localStorage.getItem("picture");
  const isAccountUser = localStorage.getItem("id");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const localsearchQuery = localStorage.getItem("searchQuery");

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    localStorage.setItem("searchQuery", e.target.value);
  };

  return (
    <div className="Header">
      <HelmetProvider>
        <Helmet>
          <title>{props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
      </HelmetProvider>

      {showPopup && <Login setShowPopup={setShowPopup} />}

      <nav className={`navbar navbar-expand-lg ${props.type}`}>
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
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Explore
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/upload">Upload</Dropdown.Item>
                  <Dropdown.Item href="#/blog">Blog</Dropdown.Item>
                  <Dropdown.Item href="#/shop">Shop</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>

            <div className="header-search-engine-div">
              <div className="faMagnifying-glass-div">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </div>
              <input
                className="header-search-engine"
                type="text"
                placeholder="Search for keywords, locations, etc."
                onChange={handleSearchChange}
                value={localsearchQuery}
              />
            </div>

            <div onClick={() => setShowPopup(true)}>
              {isAccountUser ? (
                <div className="avatar-div">
                  <div className="avatar">
                    <img src="hat.png" alt="avatar" />
                  </div>
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
                <div>
                  <FontAwesomeIcon
                    className="account-icon-fort"
                    icon={faCircleUser}
                    size="2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
