import "../Blog.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
      description: "Description 2",
    },
  ];

  const [currIndices, setCurrIndices] = useState(
    Array(demoImage.length).fill(0)
  );

  return (
    <div className="Blog">
      <div className="blog-section">
        <Header title="Blog | Réjouir" />
      </div>
      <div className="blog-main">
        {demoImage.map((imageSet, imageSetIndex) => (
          <div
            className="d-flex"
            style={{ margin: "30px" }}
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
                    <div className="lightbox">
                      <img
                        src={imageSet.images[currIndices[imageSetIndex]]}
                        alt=""
                        className="ecommerce-gallery-main-img active w-100"
                      />
                    </div>
                  </div>

                  <div className="col-3">
                    {imageSet.images.map((image, index) => (
                      <div className="mb-1" key={index}>
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
                <p>Posted 1 hour ago</p>
                <p>{imageSet.description}</p>
                <FontAwesomeIcon
                  className="like-btn"
                  icon={faHeart}
                  style={{ color: "#ff0000" }}
                  size="xl"
                />{" "}
                10 people like this
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
