import "../../App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Globe from "react-globe.gl";
import Snowfall from "react-snowfall";
import { useNavigate, Link } from "react-router-dom";

function Support() {
  const navigate = useNavigate();
  const getCountryCoordinates = (countryName) => {
    // In real use, you would replace this with actual latitude and longitude values
    return { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 };
  };

  const countryList = [
    "Global",
    "Argentina",
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Canada",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Denmark",
    "Ecuador",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Hong Kong",
    "Iceland",
    "India",
    "Indonesia",
    "Ireland",
    "Italy",
    "Jamaica",
    "Japan",
    "Kenya",
    "Lebanon",
    "Luxembourg",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Panama",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Romania",
    "Russia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Taiwan",
    "Ukraine",
    "United Kingdom",
    "United States",
    "Venezuela",
    "Zimbabwe",
  ];

  const labelsData = countryList.map((countryName) => ({
    lat: getCountryCoordinates(countryName).lat,
    lng: getCountryCoordinates(countryName).lng,
    label: countryName,
    color: "rgba(255, 165, 0, 0.75)", // Example color: semi-transparent orange
    size: 1.5, // Relative size of the label
  }));

  return (
    <div className="Support">
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Snowfall
          color="white"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "200px",
          }}
          snowflakeCount={70}
        />
      </div>

      <h3>
        Réjouir invites you to bring the Christmas tree to life with a festive
        glow 🎄✨
      </h3>
      <p>
        Réjouir stands as a bare Christmas tree, awaiting the unique sparkle of
        each and every one of you to bring it to its full, festive glory.
      </p>

      <button className="btn btn-danger" onClick={() => navigate("/list")}>
        Light it up! 🌟
      </button>
      {/* <div>
        <Globe
          className="myGlobeContainer"
          labelsData={labelsData}
          labelText="label"
          labelLat="lat"
          labelLng="lng"
          labelColor="color"
          labelSize="size"
          labelDotRadius={0.1}
          labelIncludeDot={true}
          labelDotOrientation={() => "bottom"} // Or 'top', 'right', 'left'
          // Globe textures
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          cloudsImageUrl="//unpkg.com/three-globe/example/img/earth-clouds.png"
          // Optional: Atmosphere settings for a glowing effect
          atmosphereColor="rgba(135, 206, 235, 0.2)" // soft sky blue color
          atmosphereAltitude={0.3} // Altitude of atmosphere
        />
      </div> */}
    </div>
  );
}

export default Support;
