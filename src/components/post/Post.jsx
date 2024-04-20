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
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ViewIcon from "../popup/ViewIcon";
const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [currIndex, setCurrIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [currImageUrl, setCurrImageUrl] = useState("");
  const [allImageUrl, setAllImageUrl] = useState([]);

  useEffect(() => {
    axios.get(`${REACT_APP_API_ENDPOINT}/post/${id}`).then((response) => {
      setPost(response.data.upload);
    });
  }, []);

  const returnToBlog = () => {
    window.location.href = "/#/blog";
  };

  console.log(post);

  return (
    <div className="Post background">
      <Header />
      {/* <ViewIcon
        setShowPopup={setShowPopup}
        image={currImageUrl}
        images={allImageUrl}
        currIndex={currIndex}
      /> */}
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
                justifyContent: "flex-end",
              }}
            >
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

            <div className="">
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
      </div>

      <Footer />
    </div>
  );
}

export default Post;
