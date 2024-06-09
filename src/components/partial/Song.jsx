import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, Link } from "react-router-dom";

function Song() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="Song" style={{ width: "95%", margin: "auto" }}>
      <div className="section__title text-start">
        <h2 className="title" style={{ textAlign: "center" }}>
          <span className="tg-text-gradient">{t("songs_you_might_like")}</span>
        </h2>
      </div>
      <iframe
        src="https://www.youtube.com/embed/t574Hf3-Uvo?si=cBqlsaZ9O3p--f2e"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/OdioTFBMWKE?si=mr-oEcSFjZ9a1WW3"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/8BoJzegC7Fk?si=_RBrbI8Hw9lBIsYv"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Song;
