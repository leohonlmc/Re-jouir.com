import "./Header.scoped.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faMagnifyingGlass,
  faBars,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import Login from "../../popup/Login";
import { useTranslation } from "react-i18next";

function Header(props) {
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const isAccountUser = localStorage.getItem("id");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const localsearchQuery = localStorage.getItem("searchQuery");
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = lang || i18n.language;

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

  const handleSelect = (eventKey) => {
    navigate(eventKey.replace(":lang", currentLang));
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    navigate(`/${lang}/${props.page}`);
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
          <a className="navbar-brand" href={`/#/${currentLang}`}>
            <img
              src="/R.png"
              width="50"
              height="50"
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
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {t("menu")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="/:lang/upload">
                    {t("upload")}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/:lang/blog">
                    {t("blog")}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/:lang/shop">
                    {t("shop")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>

            {props.page === "blog" && (
              <div className="header-search-engine-div">
                <div className="faMagnifying-glass-div">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                </div>

                <input
                  className="header-search-engine"
                  type="text"
                  placeholder={t("search_placeholder")}
                  onChange={handleSearchChange}
                  value={localsearchQuery}
                />
              </div>
            )}

            <div className="account-icon d-flex">
              <div className="language-div d-flex">
                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <FontAwesomeIcon icon={faLanguage} size="xl" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleLanguageChange("en")}>
                      English
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLanguageChange("cn")}>
                      繁體中文
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLanguageChange("fr")}>
                      Français
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLanguageChange("es")}>
                      Español
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {isAccountUser ? (
                <div className="avatar-div" onClick={() => setShowPopup(true)}>
                  <div className="avatar">
                    <img src="hat.png" alt={t("avatar")} />
                  </div>
                  <img
                    src={localStorage.getItem("picture")}
                    alt={t("user_picture")}
                    style={{
                      width: "60px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              ) : (
                <div onClick={() => setShowPopup(true)}>
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
