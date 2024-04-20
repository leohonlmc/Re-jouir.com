import "./Post.scoped.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../partial/Header";
import Footer from "../partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faHeart,
  faCircleUser,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ViewIcon from "../popup/ViewIcon";
import TopThreeLikedPost from "../partial/TopThreeLikedPost";
import { ToastContainer, toast } from "react-toastify";
import Blogs from "../blog/Blogs";
const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [currIndex, setCurrIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [currImageUrl, setCurrImageUrl] = useState("");
  const [allImageUrl, setAllImageUrl] = useState([]);
  const [filter, setFilter] = useState("");
  const [country, setCountry] = useState("");
  const [likedPost, setLikedPost] = useState(false);
  const [topFour, setTopFour] = useState([]);
  const [posts, setPosts] = useState([]);

  const POSTS_PER_PAGE = 10;

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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`${REACT_APP_API_ENDPOINT}/post/${id}`).then((response) => {
      setPost(response.data.upload);
    });

    fetchCurrent();
  }, []);

  const returnToBlog = () => {
    window.location.href = "/#/blog";
  };

  function copyCurrentURL() {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast("URL copied to clipboard", {
          position: "bottom-center",
          type: "success",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  }

  console.log(post);

  return (
    <div className="Post background">
      <Header />

      <ToastContainer />
      <div className="container post">
        <div className="endpoint d-flex justify-content-center align-items-center">
          <div style={{ cursor: "pointer" }} onClick={returnToBlog}>
            Blog
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
          <div>{post ? post.title : "loading"}</div>
        </div>
        <div className="row col-12 post">
          <div className="col-6 left">
            <LazyLoadImage
              src={post && REACT_APP_AWS + post.images[currIndex]}
              className="current-image"
              alt="Current image"
              onClick={() => {
                setShowPopup(true);
                setAllImageUrl(post && post.images);
                setCurrImageUrl(post && REACT_APP_AWS + post.images[currIndex]);
              }}
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  right">
            <div
              className="d-flex"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <FontAwesomeIcon
                  className="link-icon"
                  icon={faLink}
                  size="2xl"
                  onClick={copyCurrentURL}
                />
              </div>
              <div className="d-flex">
                <FontAwesomeIcon
                  className="liked-btn"
                  icon={faHeart}
                  style={{
                    color: "#ff0000",
                    fontSize: "40px",
                    padding: "12px 0px",
                  }}
                  size="2xl"
                />
                <div className="likes">{post ? post.likes.length : 0}</div>
              </div>
            </div>

            <h1 className="post-title">{post ? post.title : "loading"}</h1>
            <br />
            <p>Photo by Guest: {post ? post.guest : "loading"}</p>
            <p>Location: {post ? post.country : "loading"}</p>
            <p>Spot: {post ? post.location : "loading"}</p>

            <br />

            <div className="d-flex">
              <div className="d-flex">
                <div>
                  <FontAwesomeIcon
                    className="account-icon-fort"
                    icon={faCircleUser}
                    size="2xl"
                  />
                </div>
                <div style={{ marginLeft: "8px" }}>
                  <p>{post ? post.guest : "loading username"}</p>
                  <p>New joiner</p>
                </div>
              </div>
            </div>

            <br />

            <h3>More photos</h3>

            <br />

            <div>
              <div
                className="all-card-img-sub-section"
                style={{ padding: "0px" }}
              >
                {post &&
                  post.images.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={
                          item.slice(0, 4) !== "http"
                            ? `${REACT_APP_AWS}${item}`
                            : item
                        }
                        alt="..."
                        onClick={() => {
                          setCurrIndex(index);
                        }}
                        className={
                          index === currIndex
                            ? `images-section-curr n${currIndex}`
                            : "images-section-curr"
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <h3 style={{ textAlign: "center" }}>More posts</h3>

        <Blogs posts={posts} reload="yes" />
      </div>
      <Footer />
    </div>
  );
}

export default Post;
