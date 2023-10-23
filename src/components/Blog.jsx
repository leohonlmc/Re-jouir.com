import "../Blog.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ViewIcon from "./popup/ViewIcon";

function Blog() {
  const demoImage = [
    {
      images: [
        "/sample/1.jpg",
        "/sample/2.jpeg",
        "/sample/3.avif",
        "/sample/4.avif",
        "/sample/5.jpeg",
      ],
      title: "Title 1",
      location: "Location 1",
      event: "Night Market",
      description: "Description 1",
    },
    {
      images: [
        "/sample/6.avif",
        "/sample/7.avif",
        "/sample/8.avif",
        "/sample/9.avif",
        "/sample/10.avif",
      ],
      title: "Title 2",
      location: "Location 2",
      event: "Night Market",
      description: "Description 2",
    },
  ];

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

  const [currIndices, setCurrIndices] = useState(
    Array(demoImage.length).fill(0)
  );
  const [currImageUrl, setCurrImageUrl] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="Blog">
      <div className="blog-section">
        <Header title="Blog | Réjouir" />
      </div>

      {showPopup && (
        // <ViewIcon setShowPopup={setShowPopup} images={item.images} />
        <ViewIcon setShowPopup={setShowPopup} image={currImageUrl} />
      )}

      <div className="blog-main">
        <div className="filter-div">
          <h2
            className="browse-réjouir"
            style={{ textAlign: "left", fontWeight: "bold" }}
          >
            {`Browse around the Global`}
          </h2>

          <div className="sort-container">
            <div className="sort-by">
              <p style={{ margin: "0px" }}>Sort by:</p>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                style={{ maxWidth: "200px" }}
                defaultValue="newest"
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
              >
                {countryList.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {demoImage.map((imageSet, imageSetIndex) => (
          <div
            className="d-flex"
            style={{ marginBottom: "30px", marginTop: "10px" }}
            key={imageSetIndex}
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
                          imageSet.images[currIndices[imageSetIndex]]
                        );
                      }}
                    >
                      <img
                        src={imageSet.images[currIndices[imageSetIndex]]}
                        alt=""
                        className="ecommerce-gallery-main-img active w-100 "
                      />
                    </div>
                  </div>

                  <div className="col-3">
                    {imageSet.images.map((image, index) => (
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
                          src={image}
                          className={`active w-100 ${
                            currIndices[imageSetIndex] === index
                              ? "selected"
                              : ""
                          }`}
                          alt=""
                          onClick={() => {
                            const newIndices = [...currIndices];
                            newIndices[imageSetIndex] = index;
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
                <h1>{imageSet.title}</h1>
                <h3>📍 {imageSet.location}</h3>
                <h4>📅 {imageSet.event}</h4>
                <p>Posted 1 hour ago</p>
                <p>{imageSet.description}</p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <FontAwesomeIcon
                    className="like-btn"
                    icon={faHeart}
                    style={{ color: "#ff0000", marginRight: "7px" }}
                    size="xl"
                  />{" "}
                  10 people like this
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
