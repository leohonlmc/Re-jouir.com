import "./Post.scoped.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/partial/Header/Header";
import Footer from "../../components/partial/Footer/Footer";
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
import { ToastContainer, toast } from "react-toastify";
import Blogs from "../Blog/Blogs";
import { useTranslation } from "react-i18next";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [currIndex, setCurrIndex] = useState(0);
  // const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const [country, setCountry] = useState("");
  const [posts, setPosts] = useState([]);

  const POSTS_PER_PAGE = 10;
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

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
    window.location.href = `/#/${lang}/blog`;
  };

  function copyCurrentURL() {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast(t("url_copied"), {
          position: "bottom-center",
          type: "success",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  }

  return (
    <div className="Post main">
      <Header
        title={post ? post.title : t("loading_content")}
        type="fixed"
        page={`post/${id}`}
      />

      <ToastContainer />
      {/* <ViewIcon
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        currIndex={currIndex}
        updateCurrentIndex={updateCurrentIndex}
        post={post}
      /> */}

      <div className="container post">
        <div className="endpoint d-flex justify-content-center align-items-center">
          <div style={{ cursor: "pointer" }} onClick={returnToBlog}>
            Blog
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
          <div>{post ? post.title : t("loading")}</div>
        </div>
        <div className="row col-12 post">
          <div className="col-6 left">
            <LazyLoadImage
              src={post && REACT_APP_AWS + post.images[currIndex]}
              className="current-image"
              alt="Current image"
              // onClick={onImageClick}
              effect="blur"
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12  right">
            <div
              className="d-flex"
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "nowrap",
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
                  className="likes"
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
            <br />
            <h1 className="post-title">{post ? post.title : t("loading")}</h1>
            <br />
            <p>
              {t("photo_by_guest")}: {post ? post.guest : t("loading")}
            </p>
            <p>
              {t("location")}: {post ? post.country : t("loading")}
            </p>
            <p>
              {t("spot")}: {post ? post.location : t("loading")}
            </p>
            <br />
            <div className="d-flex">
              <div className="d-flex">
                <div className="avatar-div">
                  <FontAwesomeIcon
                    className="account-icon-fort"
                    icon={faCircleUser}
                    size="2xl"
                  />
                </div>
                <div style={{ marginLeft: "8px" }}>
                  <p>{post ? post.guest : t("loading_username")}</p>
                  <p>{t("new_joiner")}</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "8px" }}>
              <p>{post ? post.description : t("loading_description")}</p>
            </div>

            <br />
            <h3>{t("more_photos")}</h3>
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

        <h3 style={{ textAlign: "center" }}>{t("more_posts")}</h3>
        <Blogs posts={posts} reload="yes" />
      </div>
      <Footer />
    </div>
  );
}

export default Post;
