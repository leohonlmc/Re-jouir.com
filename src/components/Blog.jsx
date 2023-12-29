import "../Blog.css";
import React, { useState, useEffect, useRef, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
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

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;
const ViewIcon = React.lazy(() => import("./popup/ViewIcon"));

function Blog() {
  const countryList = [
    "Global",
    "Argentina",
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Canada",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Denmark",
    "Ecuador",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Hong Kong",
    "Iceland",
    "India",
    "Indonesia",
    "Ireland",
    "Italy",
    "Jamaica",
    "Japan",
    "Kenya",
    "Lebanon",
    "Luxembourg",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Panama",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Romania",
    "Russia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Taiwan",
    "Ukraine",
    "United Kingdom",
    "United States",
    "Venezuela",
    "Zimbabwe",
  ];

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
    "Hong Kong": "🇭🇰",
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
  const [allUpload, setAllUpload] = useState([]);
  const guest = generateRandomUserId();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [country, setCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPost, setLikedPost] = useState(false);
  const currentPage = parseInt(localStorage.getItem("currentPage"));
  const [topFour, setTopFour] = useState([]);

  const [noResult, setNoResult] = useState(false);

  const POSTS_PER_PAGE = 8;
  const [totalPages, setTotalPages] = useState(0);

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

    getTopFourCountries();

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        window.location.reload();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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
          setAllUpload(res.data.uploads);
          setCurrIndices(Array(res.data.uploads.length).fill(0));
          setLoading(false);
          setTotalPages(res.data.totalPages);

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

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      localStorage.setItem("currentPage", currentPage + 1);
      window.location.reload();
    } else if (direction === "prev" && currentPage > 1) {
      localStorage.setItem("currentPage", currentPage - 1);
      window.location.reload();
    }
  };

  const handleSSelectChange = (e, index) => {
    setFilter(`?sort=${e.target.value}`);
    localStorage.setItem("selectedFilter", e.target.value);
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry ? `?country=${selectedCountry}` : "");
    localStorage.setItem("selectedCountry", selectedCountry);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    localStorage.setItem("searchQuery", e.target.value);
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

  const getTopFourCountries = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API_ENDPOINT}/four/counties`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (data) {
        setTopFour(data.topFour);
      }
    } catch (ex) {
      if (ex.response && ex.response.data && ex.response.data.error) {
        toast.error(`Error: ${ex.response.data.error}`);
      } else {
        console.error("An error occurred:", ex);
      }
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
      {showPopup && (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <ViewIcon
              setShowPopup={setShowPopup}
              image={currImageUrl}
              images={allImageUrl}
              currIndex={currImageIndex}
              caption={capton}
            />
          </Suspense>
        </>
      )}
      <div className="blog-main">
        <div className="filter-div">
          {localStorage.getItem("selectedCountry") === "Global" ? (
            <h3
              className="browse-réjouir"
              style={{ textAlign: "left", fontWeight: "bold", margin: "0px" }}
            >
              {`Explore`}{" "}
              <span className="browse-country">{`the World 🌍`}</span>
            </h3>
          ) : (
            <h3
              className="browse-réjouir"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              {`Explore ${localStorage.getItem("selectedCountry")}`}{" "}
              <span>
                {countryEmojiMap[localStorage.getItem("selectedCountry")]}
              </span>
            </h3>
          )}

          <div className="sort-container">
            <div className="container blog">
              <div className="row">
                <div className="col-lg-12 card-margin">
                  <div className="card search-form">
                    <div className="card-body p-0">
                      <div className="row">
                        <div className="col-12">
                          <div className="row no-gutters">
                            <div className="col-lg-1 col-md-1 col-sm-1 p-0">
                              <select
                                className="form-select"
                                aria-label=".form-select-sm example"
                                value={filter.replace("?sort=", "")}
                                onChange={(e) => handleSSelectChange(e, 0)}
                              >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="likes">Likes ❤️</option>
                              </select>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 p-0">
                              <select
                                className="form-select"
                                id="exampleFormControlSelect1"
                                aria-label=".form-select-sm example"
                                value={
                                  country.replace("?country=", "") || "Global"
                                }
                                onChange={(e) => handleCountryChange(e)}
                              >
                                {countryList.map((country, index) => (
                                  <option value={country} key={index}>
                                    {`${country} ${countryEmojiMap[country]}`}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-lg-7 col-md-6 col-sm-6 p-0">
                              <input
                                type="text"
                                placeholder="Search any keywords..."
                                className="form-control"
                                id="search"
                                name="search"
                                onChange={handleSearchChange}
                              />
                            </div>
                            <div
                              className="col-lg-1 col-md-1 col-sm-2 p-0 reset"
                              onClick={() => {
                                localStorage.setItem(
                                  "selectedFilter",
                                  "newest"
                                );
                                localStorage.setItem(
                                  "selectedCountry",
                                  "Global"
                                );
                                localStorage.setItem("searchQuery", "");
                                localStorage.setItem("currentPage", 1);
                                window.location.reload();
                              }}
                            >
                              <button className="btn btn-base reset-btn">
                                Reset
                              </button>
                            </div>
                            <div
                              className="col-lg-1 col-md-2 col-sm-1 p-0"
                              onClick={() => window.location.reload()}
                              style={{
                                backgroundColor: "#d6001c",
                                borderRadius: "5px",
                              }}
                            >
                              <button className="btn btn-base search-btn">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-search"
                                  style={{ color: "white" }}
                                >
                                  <circle cx="11" cy="11" r="8"></circle>
                                  <line
                                    x1="21"
                                    y1="21"
                                    x2="16.65"
                                    y2="16.65"
                                  ></line>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-container" style={{ margin: "15px 0px" }}>
          <hr className="divider-line -black-line" />
          <h5 className="browsing-page-text">
            <span>{`Browsing page: ${localStorage.getItem(
              "currentPage"
            )}`}</span>
          </h5>
          <hr className="divider-line -black-line" />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            {noResult === true ? (
              <NoResult />
            ) : (
              <div className="container blog">
                <div className="row">
                  <div className="col-lg-8">
                    {allUpload.map((upload, uploadIndex) => (
                      <>
                        <div
                          className={
                            uploadIndex === 0 &&
                            Number(localStorage.getItem("currentPage")) === 1
                              ? "d-flex new"
                              : "d-flex"
                          }
                          style={{ marginBottom: "30px" }}
                          key={upload._id}
                        >
                          <div className="images-section">
                            <div
                              className="ecommerce-gallery"
                              data-mdb-zoom-effect="true"
                              data-mdb-auto-height="true"
                            >
                              <div className="row py-3 shadow-5">
                                <div className="col-9 mb-1">
                                  {uploadIndex === 0 &&
                                  Number(
                                    localStorage.getItem("currentPage")
                                  ) === 1 ? (
                                    <div className="new-post">
                                      <img src="/new.png" alt="" />
                                    </div>
                                  ) : null}
                                  <div
                                    className="lightbox"
                                    onClick={() => {
                                      setShowPopup(true);
                                      setCurrImageUrl(
                                        `${REACT_APP_AWS}${
                                          upload.images[
                                            currIndices[uploadIndex]
                                          ]
                                        }`
                                      );
                                      setAllImageUrl(
                                        upload.images.map(
                                          (image) => `${REACT_APP_AWS}${image}`
                                        )
                                      );
                                      setCurrImageIndex(
                                        currIndices[uploadIndex]
                                      );
                                      setCapton(upload.title);
                                    }}
                                  >
                                    <img
                                      src={`${REACT_APP_AWS}${
                                        upload.images[currIndices[uploadIndex]]
                                      }`}
                                      alt=""
                                      className="ecommerce-gallery-main-img active w-100 "
                                    />
                                  </div>
                                </div>

                                <div className="col-3">
                                  {upload.images.map((image, index) => (
                                    <div
                                      className={`mb-1 mb-1${index}`}
                                      key={index}
                                    >
                                      <div className="D_Qy-2">
                                        <p
                                          className="D_oz D_ov D_o_ D_oE D_oH D_oK D_oN D_oP"
                                          style={{
                                            textAlign: "center",
                                            margin: "0px",
                                            fontSize: "11px",
                                            color: "white",
                                          }}
                                        >
                                          {index + 1}
                                        </p>
                                      </div>
                                      <LazyLoadImage
                                        src={`${REACT_APP_AWS}${image}`}
                                        alt=""
                                        className={`active w-100 ${
                                          currIndices[uploadIndex] === index
                                            ? "selected"
                                            : ""
                                        }`}
                                        effect="blur"
                                        onClick={() => {
                                          const newIndices = [...currIndices];
                                          newIndices[uploadIndex] = index;
                                          setCurrIndices(newIndices);
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="blog-info">
                            <div className="blog-info-child">
                              <div className="all-info-div">
                                <div>
                                  <br />
                                  <ul className="inline-list">
                                    <li>
                                      {countryEmojiMap[upload.country]}{" "}
                                      {upload.country}
                                    </li>
                                    <li>
                                      <img
                                        src="/google-map.png"
                                        alt=""
                                        style={{ width: "20px" }}
                                      />
                                      <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://www.google.com/maps?q=${encodeURIComponent(
                                          upload.location
                                        )}`}
                                        style={{ textDecoration: "none" }}
                                      >
                                        {upload.location}
                                      </a>
                                    </li>
                                    <li>
                                      🗓️ {formatDateString(upload.created)}
                                    </li>
                                  </ul>
                                </div>

                                <h2> {upload.title}</h2>

                                <p className="upload-description">
                                  {upload.event}
                                </p>
                                <p className="upload-description">
                                  {upload.description}
                                </p>
                              </div>
                              <br />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                {upload.likes.includes(
                                  localStorage.getItem("guest")
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
                                    {`${upload.likes.length} people like this`}
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
                      </>
                    ))}
                  </div>
                  <div className="col-lg-4">
                    <div className="sticky-div">
                      <div className="countries-cat">
                        <h3>Locations</h3>
                        <ul className="locations-ul">
                          {topFour.map((location, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                localStorage.setItem(
                                  "selectedCountry",
                                  location._id
                                );
                                window.location.reload();
                              }}
                            >
                              <div className="locations-li">
                                <p className="location-name">
                                  {location._id.toUpperCase()}
                                </p>
                              </div>
                              <div className="locations-li">
                                {location.count}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* <Support /> */}
                      <World />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="page-number-div">
          {Number(localStorage.getItem("currentPage")) > 1 && (
            <button
              className="btn btn-outline-primary"
              onClick={() => handlePageChange("prev")}
            >
              Previous
            </button>
          )}
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              className={
                Number(localStorage.getItem("currentPage")) === page + 1
                  ? "active-1 btn btn-outline-primary"
                  : "btn btn-outline-primary"
              }
              onClick={() => {
                localStorage.setItem("currentPage", page + 1);
                window.location.reload();
              }}
            >
              {page + 1}
            </button>
          ))}
          {Number(localStorage.getItem("currentPage")) < totalPages && (
            <button
              className="btn btn-outline-primary"
              onClick={() => handlePageChange("next")}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blog;
