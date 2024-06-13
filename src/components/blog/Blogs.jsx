import "./Blog.scoped.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { REACT_APP_ENDPOINT, REACT_APP_API_ENDPOINT, REACT_APP_AWS } =
  process.env;

function Blogs(props) {
  const { t, i18n } = useTranslation();
  const [likedPost, setLikedPost] = useState(false);
  const navigate = useNavigate();
  const posts = props.posts;

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
        toast.success(t("like_success"));
      }
    } catch (ex) {
      if (ex.response && ex.response.data && ex.response.data.error) {
        toast.error(`Error: ${ex.response.data.error}`);
      } else {
        console.error("An error occurred:", ex);
      }
    }
  };

  const { lang } = useParams();
  const currentLang = lang || i18n.language;

  const handleNavigation = (id) => {
    navigate(`/${currentLang}/post/${id}`);
  };

  return (
    <div className="image-grid">
      {posts.map((upload, uploadIndex) => (
        <div className="image-item" key={uploadIndex}>
          {uploadIndex === 0 && props.loading !== "true" && (
            <div className="new-upload-icon">
              <img src="/new.png" alt="" />
            </div>
          )}

          {props.loading === "true" ? (
            <div className="lightbox">
              <div
                className={`loading-inner-image-icon loading-${upload.height}`}
              >
                <div className="loading-container">
                  <div className="loading-line"></div>
                </div>
              </div>
            </div>
          ) : (
            <a
              className="lightbox"
              href={`${REACT_APP_ENDPOINT}/#/${currentLang}/post/${upload._id}`}
              target="_blank"
              rel="noreferrer"
            >
              <LazyLoadImage
                src={`${REACT_APP_AWS}${upload.images[0]}`}
                alt={t("cover_image")}
                effect="blur"
                wrapperClassName="image-wrapper"
              />
              <div className="inner-image-icon">
                <FontAwesomeIcon icon={faImage} size="lg" />{" "}
                {upload.images.length}
              </div>
            </a>
          )}

          {props.loading !== "true" && (
            <div className="blog-info">
              <div className="all-info-div">
                <div className="container p-0">
                  <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 p-0">
                      {upload.rating > 3 ? (
                        <div>
                          <div className="rating-div green-rating">
                            <div>{t("rating")}</div>
                            <div className="text-xl leading-5 font-bold">
                              {upload.rating.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="rating-div yellow-rating">
                          <p>{t("rating")}</p>
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
                      {t("you_and_others_like", {
                        count: upload.likes.length - 1,
                      })}
                    </div>
                  ) : (
                    <div
                      className="liked-btn-div"
                      onClick={() => {
                        handleLike(upload._id, localStorage.getItem("guest"));
                        setLikedPost(true);
                        toast.success(t("like_success"));
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
                      {t("people_like_this", { count: upload.likes.length })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Blogs;
