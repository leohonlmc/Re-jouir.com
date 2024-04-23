import "../../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";

function PlaceToGo() {
  const navigate = useNavigate();

  const data = [
    {
      country: "United States",
      city: "New York",
      place: "221 Avenue of the Americas",
      class: "ny",
    },
    {
      country: "France",
      city: "Broglie, Strasbourg",
      place: "The Micheletty circus Christmas village",
      class: "fr",
    },
    {
      country: "United Kingdom",
      city: "Edinburgh, Scotland",
      place: "Christmas Market",
      class: "uk",
    },
    // {
    //   country: "Canada",
    //   city: "Toronto",
    //   place: "Distillery District",
    //   class: "ca",
    // },
    // {
    //   country: "Argentina",
    //   city: "Estonia",
    //   place: "Tallinn",
    //   class: "ar",
    // },
  ];

  const search = function (query) {
    navigate("/blog");
    localStorage.setItem("selectedCountry", query);
  };

  return (
    <div className="countries row">
      <div className="section__title text-start">
        <h2
          className="title"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          <span className="tg-text-gradient">Place</span> you would like to go
        </h2>
      </div>

      {data.map((item, index) => (
        <div
          className={`col-lg-3 col-md-4 col-sm-6 col-12 country-review ${item.class}`}
          key={index}
          onClick={() => search(item.country)}
        >
          <div>
            <h4>{item.country}</h4>
            <h5>{item.city}</h5>
            <p>{item.place}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaceToGo;
