import "../../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faMapLocationDot,
  faCloudArrowUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function ShareMoment() {
  return (
    <div>
      <div className="d-flex flex-box" style={{ padding: "20px" }}>
        <div className="feature-img">
          <img src="/moment-2.png" alt="" style={{ width: "100%" }} />
        </div>
        <div className="feature right">
          <div className="feature-child">
            <div className="section__title text-start">
              <span className="sub-title tg-text-gradient">
                Capture and Share
              </span>
              <h2 className="title">SHARE YOUR MOMENT</h2>
            </div>

            <p className="share-moment-text">
              Share festive moments from around the globe in our Christmas blog
              without an account.
            </p>

            <div class="about__facts-list">
              <div class="about__icon-box">
                <div class="icon">
                  <FontAwesomeIcon icon={faImages} size="sm" />
                </div>
                <p>1. Images</p>
              </div>
              <div class="about__icon-box">
                <div class="icon">
                  <FontAwesomeIcon icon={faMapLocationDot} size="sm" />
                </div>
                <p>2. Country, location</p>
              </div>

              <div class="about__icon-box">
                <div class="icon">
                  <FontAwesomeIcon
                    icon={faStar}
                    size="sm"
                    color="white"
                    className="fa-star-white"
                  />
                </div>
                <p>3. Rate your exp</p>
              </div>

              <div class="about__icon-box">
                <div class="icon cloud">
                  <FontAwesomeIcon icon={faCloudArrowUp} size="sm" bounce />
                </div>
                <p>4. Upload to cloud</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareMoment;
