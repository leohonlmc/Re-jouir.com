import "../../Header.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Location(props) {
  return (
    <div className="countries-cat">
      <h3>Locations</h3>
      <ul className="locations-ul">
        {props.topFour.map((location, index) => (
          <li
            key={location._id}
            onClick={() => {
              localStorage.setItem("selectedCountry", location._id);
              window.location.reload();
            }}
          >
            <div className="locations-li">
              <p className="location-name">{location._id.toUpperCase()}</p>
            </div>
            <div className="locations-li">{location.count}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Location;
