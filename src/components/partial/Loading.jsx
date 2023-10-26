import "../../Header.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Loading() {
  return (
    <div className="Loading">
      <div
        className="d-flex"
        style={{ marginBottom: "30px", marginTop: "10px" }}
      >
        <div className="images-section">
          <div
            className="ecommerce-gallery"
            data-mdb-zoom-effect="true"
            data-mdb-auto-height="true"
          >
            <div
              className="row py-3 shadow-5"
              style={{
                minHeight: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="spin-div">
                <FontAwesomeIcon
                  icon={faSpinner}
                  size="2xl"
                  spin
                  color="white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="blog-info">
          <div className="blog-info-child">
            <h1
              style={{
                backgroundColor: "lightgrey",
                borderRadius: "20px",
                height: "30px",
              }}
            ></h1>
            <h3
              style={{
                backgroundColor: "lightgrey",
                borderRadius: "20px",
                height: "30px",
                width: "50%",
              }}
            ></h3>
            <p
              style={{
                backgroundColor: "lightgrey",
                borderRadius: "20px",
                height: "30px",
                width: "30%",
              }}
            ></p>
            <p
              style={{
                backgroundColor: "lightgrey",
                borderRadius: "20px",
                height: "30px",
                width: "30%",
              }}
            ></p>
            <p
              style={{
                backgroundColor: "lightgrey",
                borderRadius: "20px",
                height: "50px",
                width: "100%",
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
