import "./Blog.scoped.css";
import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../partial/Header";
import Footer from "../partial/Footer";
import axios from "axios";
import generateRandomUserId from "../functions/generateRandomUserId";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import NoResult from "../partial/NoResult";
import SearchBar from "../partial/SearchBar";
import { AppStateContext } from "../../Context/AppStateProvider";
import Blogs from "./Blogs";
import ReminderDiv from "./ReminderDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const { REACT_APP_API_ENDPOINT } = process.env;

function Blog() {
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const guest = generateRandomUserId();
  const { loading, setLoading } = useContext(AppStateContext);
  const [filter, setFilter] = useState("");
  const [country, setCountry] = useState("");
  const [noResult, setNoResult] = useState(false);
  const POSTS_PER_PAGE = 100;
  const [isVisible, setIsVisible] = useState(false);
  const close = localStorage.getItem("close");
  const keywords = localStorage.getItem("searchQuery");

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("guest") === null) {
      localStorage.setItem("guest", guest);
    }

    if (localStorage.getItem("currentPage") === null) {
      localStorage.setItem("currentPage", 1);
    }

    if (
      localStorage.getItem("selectedFilter") === null ||
      !localStorage.getItem("selectedFilter")
    ) {
      localStorage.setItem("selectedFilter", "newest");
    }

    if (localStorage.getItem("selectedCountry") === null) {
      localStorage.setItem("selectedCountry", "Global");
    }

    fetchCurrent();

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        window.location.reload();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const fetchCurrent = () => {
    const savedFilterValue = localStorage.getItem("selectedFilter");
    const savedCountryValue = localStorage.getItem("selectedCountry");
    const savedSearchQuery = localStorage.getItem("searchQuery");

    const savedCountry = savedCountryValue
      ? `?country=${savedCountryValue}`
      : "?country=global";

    const savedSearch = savedSearchQuery
      ? `&searchQuery=${savedSearchQuery}`
      : "";

    setFilter(savedFilterValue ? `?sort=${savedFilterValue}` : "");
    setCountry(savedCountryValue ? `?country=${savedCountryValue}` : "");

    axios
      .get(
        `${REACT_APP_API_ENDPOINT}/all/upload${savedCountry}&sort=${savedFilterValue}&page=${localStorage.getItem(
          "currentPage"
        )}&limit=${POSTS_PER_PAGE}${savedSearch}`
      )
      .then((res) => {
        if (res.data && res.data.uploads) {
          setPosts(res.data.uploads);
          setLoading(false);

          if (res.data.uploads.length === 0) {
            setNoResult(true);
          } else {
            setNoResult(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Blog">
      <div className="blog-section">
        <Header title={!loading ? "Blog | Réjouir" : "Loading content..."} />
      </div>
      <Helmet>
        <link rel="canonical" href="https://www.rejouirxmas.com/blog" />
      </Helmet>
      <ToastContainer position="top-center" autoClose={1500} />

      <div className="blog-main">
        <div className="filter-div">
          <SearchBar showPopup={showPopup} />
        </div>

        {keywords.length > 0 ? (
          <div
            onClick={() => {
              localStorage.setItem("searchQuery", "");
              window.location.reload();
            }}
          >
            <span className="keywords">
              {keywords} <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
        ) : null}

        {noResult === true ? <NoResult /> : <Blogs posts={posts && posts} />}
      </div>

      {close !== "true" && localStorage.getItem("id") === null ? (
        <ReminderDiv />
      ) : null}

      <Footer />
    </div>
  );
}

export default Blog;
