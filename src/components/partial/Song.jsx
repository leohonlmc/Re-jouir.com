import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function Song() {
  const navigate = useNavigate();

  return (
    <div className="Song">
      <div className="section__title text-start">
        <h2 className="title" style={{ textAlign: "center" }}>
          <span className="tg-text-gradient">Songs</span> you might like
        </h2>

        <p style={{ margin: "0px", textAlign: "center" }}>
          Live music for your day!
        </p>
      </div>
      <iframe
        src="https://www.youtube.com/embed/t574Hf3-Uvo?si=cBqlsaZ9O3p--f2e"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/7bTONXkd700?si=bzkcKsbw_LzoKuGe"
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
