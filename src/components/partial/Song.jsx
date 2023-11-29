import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function Song() {
  const navigate = useNavigate();

  return (
    <div className="Song">
      <iframe
        src="https://www.youtube.com/embed/t574Hf3-Uvo?si=cBqlsaZ9O3p--f2e"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/-KWvMIgLzuc?si=Q-BikVy1Ih6v4iJK"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/KjcnY6nFncA?si=0eMddHYtvL1-kFOE"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default Song;
