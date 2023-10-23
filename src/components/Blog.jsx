import "../Blog.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ViewIcon from "./popup/ViewIcon";
import axios from "axios";
import formatDateString from "./functions/formatDateString";
import generateRandomUserId from "./functions/generateRandomUserId";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

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
    "Ukraine",
    "United Kingdom",
    "United States",
    "Venezuela",
    "Zimbabwe",
  ];

  const [currIndices, setCurrIndices] = useState([]);
  const [currImageUrl, setCurrImageUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [allUpload, setAllUpload] = useState([]);
  const guest = generateRandomUserId();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (localStorage.getItem("guest") === null) {
      localStorage.setItem("guest", guest);
    }

    // Fetch selected values from localStorage
    const savedFilterValue = localStorage.getItem("selectedFilter");
    const savedCountryValue = localStorage.getItem("selectedCountry");

    const savedFilter = savedFilterValue
      ? `?sort=${savedFilterValue}`
      : "?sort=newest";
    const savedCountry = savedCountryValue
      ? `?country=${savedCountryValue}`
      : "?country=global";

    setFilter(savedFilterValue ? `?sort=${savedFilterValue}` : "");
    setCountry(savedCountryValue ? `?country=${savedCountryValue}` : "");

    axios
      .get(`${REACT_APP_API_ENDPOINT}/all/upload${savedCountry}&${savedFilter}`)
      .then((res) => {
        if (res.data && res.data.uploads) {
          if (savedFilterValue === "newest") {
            setAllUpload(res.data.uploads.reverse());
          } else if (savedFilterValue === "oldest") {
            setAllUpload(res.data.uploads);
          } else if (savedFilterValue === "likes") {
            setAllUpload(
              res.data.uploads.sort((a, b) => b.likes.length - a.likes.length)
            );
          }
          setCurrIndices(Array(res.data.uploads.length).fill(0));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSSelectChange = (e, index) => {
    setFilter(`?sort=${e.target.value}`);
    localStorage.setItem("selectedFilter", e.target.value);
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry ? `?country=${selectedCountry}` : "");
    localStorage.setItem("selectedCountry", selectedCountry);
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

      <ToastContainer />

      {showPopup && (
        <ViewIcon setShowPopup={setShowPopup} image={currImageUrl} />
      )}

      <div className="blog-main">
        <div className="filter-div">
          {localStorage.getItem("selectedCountry") === "Global" ? (
            <h2
              className="browse-réjouir"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              {`Browse around the Global`}
            </h2>
          ) : (
            <h2
              className="browse-réjouir"
              style={{ textAlign: "left", fontWeight: "bold" }}
            >
              {`Browse around ${localStorage.getItem("selectedCountry")}`}
            </h2>
          )}

          <div className="sort-container">
            <div className="sort-by">
              <p style={{ margin: "0px" }}>Sort by:</p>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                style={{ maxWidth: "200px" }}
                value={filter.replace("?sort=", "")}
                onChange={(e) => handleSSelectChange(e, 0)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="likes">Likes</option>
              </select>
            </div>

            <div className="sort-by">
              <p style={{ margin: "0px" }}>Country:</p>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                style={{ maxWidth: "200px" }}
                value={country.replace("?country=", "") || "Global"}
                onChange={(e) => handleCountryChange(e)}
              >
                {countryList.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Filter
            </button>
          </div>
        </div>

        {allUpload.map((upload, uploadIndex) => (
          <div
            className="d-flex"
            style={{ marginBottom: "30px", marginTop: "10px" }}
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
                    <div
                      className="lightbox"
                      onClick={() => {
                        setShowPopup(true);
                        setCurrImageUrl(
                          `${REACT_APP_AWS}${
                            upload.images[currIndices[uploadIndex]]
                          }`
                        );
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
                      <div className="mb-1" key={index}>
                        <div className="D_Qy-2">
                          <p
                            className="D_oz D_ov D_o_ D_oE D_oH D_oK D_oN D_oP"
                            style={{
                              textAlign: "center",
                              margin: "0px",
                              fontSize: "11px",
                            }}
                          >
                            {index + 1}
                          </p>
                        </div>
                        <img
                          src={`${REACT_APP_AWS}${image}`}
                          className={`active w-100 ${
                            currIndices[uploadIndex] === index ? "selected" : ""
                          }`}
                          alt=""
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
                <h1>{upload.title}</h1>
                <h3>{`${upload.country}, ${upload.location} 📍`}</h3>
                <p>{`${formatDateString(upload.created)} 📅`}</p>
                <p>{upload.event}</p>
                <p>{upload.description}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>{`Guest: ${upload.guest}`}</p>
                  {upload.likes.includes(localStorage.getItem("guest")) ? (
                    <div>
                      <FontAwesomeIcon
                        className="liked-btn"
                        icon={faHeart}
                        style={{ color: "#ff0000", marginRight: "0px" }}
                        size="xl"
                      />{" "}
                      {`${upload.likes.length} people like this`}
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        handleLike(upload._id, localStorage.getItem("guest"))
                      }
                    >
                      <FontAwesomeIcon
                        className="like-btn"
                        icon={faHeart}
                        style={{ color: "grey", marginRight: "0px" }}
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

      <Footer />
    </div>
  );
}

export default Blog;
