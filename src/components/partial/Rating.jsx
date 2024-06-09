import "../../Rating.scoped.css";
import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function Rating({ onRatingChange }) {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(false);
  const [selected5, setSelected5] = useState(false);
  const { t } = useTranslation();

  const handleStarClick = (rating) => {
    onRatingChange(rating);
  };

  return (
    <div className="Rating">
      <div className="d-flex star-div">
        <div className="d-flex">
          <p className="rating-message">
            {t("your_rating")}? <span className="asterisk">*</span>
          </p>
        </div>
        <div>
          <div className="ratings">
            <FontAwesomeIcon
              icon={faStar}
              size="xl"
              className={`fa-star s1 ${selected1 ? "selected" : ""}`}
              onClick={() => {
                handleStarClick(1);
                setSelected1(true);
                setSelected2(false);
                setSelected3(false);
                setSelected4(false);
                setSelected5(false);
              }}
            />
            <FontAwesomeIcon
              icon={faStar}
              size="xl"
              className={`fa-star s2 ${selected2 ? "selected" : ""}`}
              onClick={() => {
                handleStarClick(2);
                setSelected1(true);
                setSelected2(true);
                setSelected3(false);
                setSelected4(false);
                setSelected5(false);
              }}
            />
            <FontAwesomeIcon
              icon={faStar}
              size="xl"
              className={`fa-star s3 ${selected3 ? "selected" : ""}`}
              onClick={() => {
                handleStarClick(3);
                setSelected1(true);
                setSelected2(true);
                setSelected3(true);
                setSelected4(false);
                setSelected5(false);
              }}
            />
            <FontAwesomeIcon
              icon={faStar}
              size="xl"
              className={`fa-star s4 ${selected4 ? "selected" : ""}`}
              onClick={() => {
                handleStarClick(4);
                setSelected1(true);
                setSelected2(true);
                setSelected3(true);
                setSelected4(true);
                setSelected5(false);
              }}
            />
            <FontAwesomeIcon
              icon={faStar}
              size="xl"
              className={`fa-star s5 ${selected5 ? "selected" : ""}`}
              onClick={() => {
                handleStarClick(5);
                setSelected1(true);
                setSelected2(true);
                setSelected3(true);
                setSelected4(true);
                setSelected5(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
