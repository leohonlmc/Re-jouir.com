import "./Blog.scoped.css";
import React, { useState, useEffect, Suspense, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../partial/Header";
import Footer from "../partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faB,
  faBookmark,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { faCircleChevronUp, faImage } from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

function Blogs(props) {
  const [currIndices, setCurrIndices] = useState([]);
  const [currImageUrl, setCurrImageUrl] = useState("");
  const [upload, setUpload] = useState([]);
  const [allImageUrl, setAllImageUrl] = useState([]);
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [capton, setCapton] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("");
  const [country, setCountry] = useState("");
  const [likedPost, setLikedPost] = useState(false);
  const [topFour, setTopFour] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const POSTS_PER_PAGE = 100;
  const [totalPages, setTotalPages] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const posts = props.posts;
  const [loading, setLoading] = useState(true);

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

  // if (loading) {
  //   return <div>loading...</div>;
  // }

  return (
    <div className="image-grid">
      {posts.map((upload, uploadIndex) => (
        <div className="image-item" key={uploadIndex}>
          {uploadIndex === 0 ? (
            <div className="new-upload-icon">
              <img src="/new.png" alt="" />
            </div>
          ) : null}

          <div
            className="lightbox"
            onClick={() => {
              navigate(`/post/${upload._id}`);
              if (props.reload === "yes") {
                window.location.reload();
              }
            }}
          >
            <LazyLoadImage
              src={`${REACT_APP_AWS}${upload.images[0]}`}
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
              <div className="container p-0">
                <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="col-lg-3 col-md-3 col-sm-3 col-3 p-0">
                    {upload.rating > 3 ? (
                      <div>
                        <div className="rating-div green-rating">
                          <div>Rating</div>
                          <div className="text-xl leading-5 font-bold">
                            {upload.rating.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rating-div yellow-rating">
                        <p>Rating</p>
                        <div className="text-xl leading-5 font-bold">NA</div>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-9 col-md-9 col-sm-9 col-9 p-0">
                    <p className="post-title p-2">{upload.title}</p>
                  </div>
                </div>
              </div>

              <div className="upload-description-div">
                <p className="upload-description truncate">
                  {upload.description}
                </p>
              </div>

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
                    {`You and ${upload.likes.length - 1} others like this`}
                  </div>
                ) : (
                  <div
                    className="liked-btn-div"
                    onClick={() => {
                      handleLike(upload._id, localStorage.getItem("guest"));
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
  );
}

export default Blogs;
