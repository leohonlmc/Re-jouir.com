import "../../Header.scoped.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Page(props) {
  const currentPage = parseInt(localStorage.getItem("currentPage"));

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < props.totalPages) {
      localStorage.setItem("currentPage", currentPage + 1);
      window.location.reload();
    } else if (direction === "prev" && currentPage > 1) {
      localStorage.setItem("currentPage", currentPage - 1);
      window.location.reload();
    }
  };

  return (
    <div className="page-number-div p-0">
      {Number(localStorage.getItem("currentPage")) > 1 && (
        <button
          className="btn btn-light"
          onClick={() => handlePageChange("prev")}
          style={{ borderRadius: "50%" }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      {[...Array(props.totalPages).keys()].map((page, index) => (
        <button
          key={index}
          className={
            Number(localStorage.getItem("currentPage")) === page + 1
              ? "active-1 btn btn-light"
              : "btn btn-light"
          }
          onClick={() => {
            localStorage.setItem("currentPage", page + 1);
            window.location.reload();
          }}
        >
          {page + 1}
        </button>
      ))}
      {Number(localStorage.getItem("currentPage")) < props.totalPages && (
        <button
          className="btn btn-light"
          onClick={() => handlePageChange("next")}
          style={{ borderRadius: "50%" }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
}

export default Page;
