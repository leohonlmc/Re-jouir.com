import "../../Header.scoped.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function NoResult() {
  return (
    <div
      className="NoResult"
      style={{ textAlign: "center", margin: "100px 0px" }}
    >
      <h2>Sorry, no results found! 🙁</h2>
      <p>{`Search Result: ${localStorage.getItem(
        "current"
      )}, Country: ${localStorage.getItem(
        "selectedCountry"
      )}, Keywords: ${localStorage.getItem("searchQuery")}`}</p>
    </div>
  );
}

export default NoResult;
