import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function Song() {
  const navigate = useNavigate();

  return (
    <div
      className="Song"
      style={{ paddingTop: "100px", width: "95%", margin: "auto" }}
    >
      <div className="section__title text-start">
        <h2 className="title" style={{ textAlign: "center" }}>
          <span className="tg-text-gradient">Songs</span> you might like
        </h2>
      </div>
      <iframe
        src="https://www.youtube.com/embed/t574Hf3-Uvo?si=cBqlsaZ9O3p--f2e"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/OdioTFBMWKE?si=mr-oEcSFjZ9a1WW3"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/8BoJzegC7Fk?si=_RBrbI8Hw9lBIsYv"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default Song;
