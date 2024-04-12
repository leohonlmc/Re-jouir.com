import "../Blog.scoped.css";
import React, { useState, useEffect, Suspense, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faB,
  faBookmark,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import formatDateString from "./functions/formatDateString";
import generateRandomUserId from "./functions/generateRandomUserId";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./partial/Loading";
import Support from "./popup/Support";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import NoResult from "./partial/NoResult";
import World from "./effect/World";
import TopThreeLikedPost from "./partial/TopThreeLikedPost";
import SearchBar from "./partial/SearchBar";
import { faCircleChevronUp, faImage } from "@fortawesome/free-solid-svg-icons";
import { AppStateContext } from "../Context/AppStateProvider";
import Page from "./partial/Page";
import Location from "./partial/Location";
import InfiniteScroll from "react-infinite-scroll-component";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;
const ViewIcon = React.lazy(() => import("./popup/ViewIcon"));

function Blog() {
  const countryEmojiMap = {
    Global: "🌍",
    Argentina: "🇦🇷",
    Australia: "🇦🇺",
    Austria: "🇦🇹",
    Belgium: "🇧🇪",
    Brazil: "🇧🇷",
    Canada: "🇨🇦",
    Chile: "🇨🇱",
    Colombia: "🇨🇴",
    "Costa Rica": "🇨🇷",
    Denmark: "🇩🇰",
    Ecuador: "🇪🇨",
    Finland: "🇫🇮",
    France: "🇫🇷",
    Germany: "🇩🇪",
    Greece: "🇬🇷",
    Hungary: "🇭🇺",
    "Hong Kong SAR": "🇭🇰",
    Iceland: "🇮🇸",
    India: "🇮🇳",
    Indonesia: "🇮🇩",
    Ireland: "🇮🇪",
    Italy: "🇮🇹",
    Jamaica: "🇯🇲",
    Japan: "🇯🇵",
    Kenya: "🇰🇪",
    Lebanon: "🇱🇧",
    Luxembourg: "🇱🇺",
    Mexico: "🇲🇽",
    Netherlands: "🇳🇱",
    "New Zealand": "🇳🇿",
    Norway: "🇳🇴",
    Panama: "🇵🇦",
    Peru: "🇵🇪",
    Philippines: "🇵🇭",
    Poland: "🇵🇱",
    Portugal: "🇵🇹",
    "Puerto Rico": "🇵🇷",
    Romania: "🇷🇴",
    Russia: "🇷🇺",
    "South Africa": "🇿🇦",
    "South Korea": "🇰🇷",
    Spain: "🇪🇸",
    Sweden: "🇸🇪",
    Switzerland: "🇨🇭",
    Turkey: "🇹🇷",
    Taiwan: "🇹🇼",
    Ukraine: "🇺🇦",
    "United Kingdom": "🇬🇧",
    "United States": "🇺🇸",
    Venezuela: "🇻🇪",
    Zimbabwe: "🇿🇼",
  };

  const [currIndices, setCurrIndices] = useState([]);
  const [currImageUrl, setCurrImageUrl] = useState("");
  const [allImageUrl, setAllImageUrl] = useState([]);
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [capton, setCapton] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
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

    // getTopFourCountries();

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
          setPosts((prevPosts) => [...prevPosts, ...res.data.uploads]);
          setHasMore(res.data.uploads.length > 0);
          setCurrIndices(Array(res.data.uploads.length).fill(0));
          setLoading(false);
          // setTotalPages(res.data.totalPages);

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

  const handleLike = async (postId, guest) => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/like`,
        {
          postId,
          guest,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (data) {
        toast.success("You liked this post!");
        fetchCurrent();
      }
    } catch (ex) {
      if (ex.response && ex.response.data && ex.response.data.error) {
        toast.error(`Error: ${ex.response.data.error}`);
      } else {
        console.error("An error occurred:", ex);
      }
    }
  };

  // const getTopFourCountries = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${REACT_APP_API_ENDPOINT}/four/counties`,
  //       {
  //         withCredentials: true,
  //         credentials: "include",
  //       }
  //     );
  //     if (data) {
  //       setTopFour(data.topFour);
  //     }
  //   } catch (ex) {
  //     if (ex.response && ex.response.data && ex.response.data.error) {
  //       toast.error(`Error: ${ex.response.data.error}`);
  //     } else {
  //       console.error("An error occurred:", ex);
  //     }
  //   }
  // };

  return (
    <div className="Blog" style={{ paddingTop: "100px" }}>
      <div className="blog-section">
        <Header title="Blog | Réjouir" />
      </div>
      <Helmet>
        <link rel="canonical" href="https://www.rejouirxmas.com/blog" />
      </Helmet>
      <ToastContainer position="top-center" autoClose={1500} />
      {showPopup && (
        <Suspense fallback={<div>Loading...</div>}>
          <ViewIcon
            setShowPopup={setShowPopup}
            image={currImageUrl}
            images={allImageUrl}
            currIndex={currImageIndex}
            caption={capton}
          />
        </Suspense>
      )}
      <div className="blog-main">
        <div className="filter-div">
          <SearchBar showPopup={showPopup} />
        </div>

        {noResult === true ? (
          <NoResult />
        ) : (
          <div className="image-grid">
            {posts.map((upload, uploadIndex) => (
              <div className="image-item" key={upload._id}>
                {uploadIndex === 0 ? (
                  <div className="new-upload-icon">
                    <img src="/new.png" alt="" />
                  </div>
                ) : null}

                <div
                  className="lightbox"
                  onClick={() => {
                    setShowPopup(true);
                    setCurrImageUrl(
                      `${REACT_APP_AWS}${
                        upload.images[currIndices[uploadIndex]]
                      }`
                    );
                    setAllImageUrl(
                      upload.images.map((image) => `${REACT_APP_AWS}${image}`)
                    );
                    setCurrImageIndex(currIndices[uploadIndex]);
                    setCapton(upload.title);
                  }}
                >
                  <LazyLoadImage
                    src={`${REACT_APP_AWS}${
                      upload.images[currIndices[uploadIndex]]
                    }`}
                    alt="Cover Image"
                    effect="blur"
                    wrapperClassName="image-wrapper"
                  />
                  <div className="inner-image-icon">
                    <FontAwesomeIcon icon={faImage} size="lg" />{" "}
                    {upload.images.length}
                  </div>
                </div>

                <div className="blog-info">
                  <div className="all-info-div">
                    {/* <ul className="inline-list">
                        <li>
                          {countryEmojiMap[upload.country]}
                          {upload.country}
                        </li>
                        <li>
                          <a
                            style={{ textDecoration: "none" }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://www.google.com/maps?q=${encodeURIComponent(
                              upload.location
                            )}`}
                          >
                            <img
                              src="/google-map.png"
                              alt="Google map icon"
                              style={{ width: "20px" }}
                            />
                          </a>
                        </li>
                        <li>🗓️ {formatDateString(upload.created)}</li>
                      </ul> */}

                    <div className="container p-0">
                      <div className="row col-lg-12">
                        <div className="col-lg-2 col-md-3 p-0">
                          {upload.rating > 3 ? (
                            <div className="rating-div green-rating">
                              <div>Rating</div>
                              <div className="text-xl leading-5 font-bold ">
                                {upload.rating.toFixed(1)}
                              </div>
                            </div>
                          ) : (
                            <div className="rating-div yellow-rating">
                              <div>Rating</div>
                              <div className="text-xl leading-5 font-bold ">
                                NA
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-lg-10 col-md-9 p-0">
                          <h4 className="p-2">{upload.title}</h4>
                        </div>
                      </div>
                    </div>

                    <p className="upload-description truncate">
                      {upload.description}
                    </p>

                    <div>
                      {upload.likes.includes(
                        localStorage.getItem("guest") ||
                          upload.likes.includes(localStorage.getItem("id"))
                      ) ? (
                        <div className="liked-btn-div">
                          <FontAwesomeIcon
                            className="liked-btn"
                            icon={faHeart}
                            style={{
                              color: "#ff0000",
                              marginRight: "0px",
                            }}
                            size="xl"
                          />{" "}
                          {`You and ${
                            upload.likes.length - 1
                          } others like this`}
                        </div>
                      ) : (
                        <div
                          className="liked-btn-div"
                          onClick={() => {
                            handleLike(
                              upload._id,
                              localStorage.getItem("guest")
                            );
                            setLikedPost(true);
                            toast.success("You liked the post!");
                          }}
                        >
                          <FontAwesomeIcon
                            className="like-btn"
                            icon={faHeart}
                            style={{
                              color: "grey",
                              marginRight: "0px",
                            }}
                            size="xl"
                          />{" "}
                          {`${upload.likes.length} people like this`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Blog;
