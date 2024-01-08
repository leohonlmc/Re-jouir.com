import React, { useEffect, useState, useRef } from "react";
import Footer from "../partial/Footer";
import { useNavigate, Link } from "react-router-dom";

function Submitted() {
  const navigate = useNavigate();

  return (
    <div className="Submitted" style={{ height: "80vh", textAlign: "center" }}>
      <div
        className="d-flex"
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          margin: "150px 0px 0px 0px",
        }}
      >
        <div>
          <h2>Thank you for your contribution!</h2>
          <p>Our Santa's team will review ASAP</p>
        </div>
      </div>

      <a className="btn btn-success" href="/#/blog">
        Return to blog
      </a>
    </div>
  );
}

export default Submitted;
