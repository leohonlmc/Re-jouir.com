import "../../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function PlaceToGo() {
  const data = [
    {
      country: "United States",
      city: "New York",
      place: "The Columbus Circle Holiday Market",
      class: "ny",
    },
    {
      country: "France",
      city: "Broglie, Strasbourg",
      place: "The Christkindelsmärik",
      class: "fr",
    },
    {
      country: "United Kingdom",
      city: "Edinburgh, Scotland",
      place: "Christmas Market",
      class: "uk",
    },
  ];

  return (
    <div className="Home">
      <div className="countries row">
        <div>
          <h2 style={{ fontWeight: "bold" }}>Place you would like to go</h2>
          <p style={{ margin: "0px" }}>More to find from our blog section!</p>
        </div>
        {data.map((item, index) => (
          <div
            className={`col-lg-3 col-md-4 col-sm-6 col-12 country-review ${item.class}`}
            key={index}
          >
            <div>
              <h4>{item.country}</h4>
              <h5>{item.city}</h5>
              <p>{item.place}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceToGo;
