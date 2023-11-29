import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function Feedback() {
  const navigate = useNavigate();

  return (
    <div className="Feedback">
      <p style={{ margin: "0px" }}>
        Would you like to provide <strong>feedback</strong> or become a{" "}
        <strong>prospective client</strong> through our website? Please feel
        free to contact us via{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:rejouirxmas@gmail.com"
          style={{ color: "yellow", fontWeight: "bold" }}
        >
          HERE!
        </a>{" "}
        Merry Christmas! 🌟
      </p>
    </div>
  );
}

export default Feedback;
