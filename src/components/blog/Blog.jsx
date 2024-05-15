import "./Blog.scoped.css";
import React, { useState, useEffect, Suspense, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../partial/Header";
import Footer from "../partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faB,
  faBookmark,
  faHeart,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import formatDateString from "../functions/formatDateString";
import generateRandomUserId from "../functions/generateRandomUserId";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import NoResult from "../partial/NoResult";
import SearchBar from "../partial/SearchBar";
import { faCircleChevronUp, faImage } from "@fortawesome/free-solid-svg-icons";
import { AppStateContext } from "../../Context/AppStateProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Blogs from "./Blogs";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;
const ViewIcon = React.lazy(() => import("../popup/ViewIcon"));

function Blog() {
  const [currImageUrl, setCurrImageUrl] = useState("");
  const [upload, setUpload] = useState([]);
  const [allImageUrl, setAllImageUrl] = useState([]);
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [capton, setCapton] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const guest = generateRandomUserId();
  const { loading, setLoading } = useContext(AppStateContext);
  const [filter, setFilter] = useState("");
  const [country, setCountry] = useState("");
  const [likedPost, setLikedPost] = useState(false);
  const [topFour, setTopFour] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const POSTS_PER_PAGE = 100;
  const [totalPages, setTotalPages] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const close = localStorage.getItem("close");
  const [closePopup, setClosePopup] = useState(false);

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

  const createUser = async () => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/api/user`,
        {
          id: localStorage.getItem("id"),
          name: localStorage.getItem("name"),
          given_name: localStorage.getItem("given_name"),
          family_name: localStorage.getItem("family_name"),
          email: localStorage.getItem("email"),
          picture: localStorage.getItem("picture"),
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (data) {
        console.log("User created");
        window.location.reload();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="Blog">
      <div className="blog-section">
        <Header title="Blog | Réjouir" />
      </div>
      <Helmet>
        <link rel="canonical" href="https://www.rejouirxmas.com/blog" />
      </Helmet>
      <ToastContainer position="top-center" autoClose={1500} />

      <div className="blog-main">
        <div className="filter-div">
          <SearchBar showPopup={showPopup} />
        </div>
        {noResult === true ? <NoResult /> : <Blogs posts={posts && posts} />}
      </div>

      {close !== "true" &&
      localStorage.getItem("id") === null &&
      closePopup === false ? (
        <div className="login-message-div p-8">
          <div
            onClick={() => {
              localStorage.setItem("close", "true");
              setClosePopup(true);
            }}
          >
            <FontAwesomeIcon
              className="close-google-login"
              icon={faXmark}
              size="2xl"
            />
          </div>
          <h4>You are signed out</h4>
          <p>Sign in to get the best experience</p>

          <div className="google-login">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                var decoded = jwtDecode(credentialResponse.credential);

                localStorage.setItem("id", decoded.sub);
                localStorage.setItem("name", decoded.name);
                localStorage.setItem("given_name", decoded.given_name);
                localStorage.setItem("family_name", decoded.family_name);
                localStorage.setItem("email", decoded.email);
                localStorage.setItem("picture", decoded.picture);
                createUser();
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </div>

          <p className="grey-color-text">
            By continuing, you agree to Rejouir's{" "}
            <a className="terms" style={{ fontWeight: "bold" }} href="/#/terms">
              Terms of Service
            </a>{" "}
            ; Opens a new tab and acknowledge you've read our{" "}
            <a
              className="privacy"
              style={{ fontWeight: "bold" }}
              href="/#/privacy"
            >
              Privacy Policy
            </a>{" "}
            ; Opens a new tab . Notice at collection ; Opens a new tab .
          </p>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}

export default Blog;
