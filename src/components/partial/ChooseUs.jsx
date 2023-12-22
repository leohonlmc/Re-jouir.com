import "../../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faUserLargeSlash,
  faEarthAmericas,
  faMapLocationDot,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const data = [
    {
      title: "Christmas Blog",
      description: "Share up to 5 images about Christmas from your country!",
    },
    {
      title: "Connect the Globe",
      description: "We CAPTURE the Christmas spirit from around the globe.",
    },
    {
      title: "Share your Christmas",
      description: "Share your Christmas with the world!",
    },
    {
      title: "Guest Visit",
      description: "Don't need an account to share your Christmas moment!",
    },
  ];
  return (
    <div className="Home">
      <div className="container">
        <div className="position-relative">
          <div className="row justify-content-center">
            {data.map((item, index) => (
              <div className={`col-xl-3 col-lg-4 col-sm-6 a${index}`}>
                <div className="choose__item">
                  <div className="choose__item-count tg-text-gradient">
                    0{index + 1}.
                  </div>
                  <div className="choose__item-content">
                    <h3 className="title">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
