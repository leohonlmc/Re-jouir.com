import "../../Blog.css";
import React, { useState, useEffect, useRef, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

function TopThree() {
  const [topThree, setTopThree] = useState([]);

  useEffect(() => {
    getTopThreeLikedPost();
  }, []);

  const getTopThreeLikedPost = async () => {
    try {
      const { data } = await axios.get(`${REACT_APP_API_ENDPOINT}/top/three`, {
        withCredentials: true,
        credentials: "include",
      });
      if (data) {
        setTopThree(data.topThree);
      }
    } catch (ex) {
      console.error("An error occurred:", ex);
      //   love you b
    }
  };

  const search = function (query) {
    // searchQuery
    //refresh the page
    window.location.reload();
    localStorage.setItem("searchQuery", query);
  };

  return (
    <div className="TopThree">
      <h3 className="top-section-text">Top liked post</h3>
      {topThree.map((item, index) => (
        <div
          className="country-review-blog"
          key={index}
          style={{
            backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0),
                rgba(0, 0, 0, 0.2),
                rgba(0, 0, 0, 0.7),
                rgb(0, 0, 0)
            ), url(${REACT_APP_AWS}${item.images[0]})`,
          }}
          onClick={() => search(item.title)}
        >
          <div className="ranking">
            <img src={`/number${index + 1}.png`} alt="" />
          </div>
          <div
            className="d-flex"
            style={{ flexWrap: "nowrap", flexDirection: "row" }}
          >
            <div className="top-three-content">
              <h4>{item.country}</h4>
              <h5>{item.location}</h5>
              <p>{item.title}</p>
            </div>
            <div className="total-like">
              <h2>
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{
                    color: "#ff0000",
                    marginRight: "0px",
                    cursor: "default",
                  }}
                />{" "}
                {item.likes.length}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopThree;
