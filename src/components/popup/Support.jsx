import "../../App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Snowfall from "react-snowfall";
import { useNavigate, Link } from "react-router-dom";

function Support() {
  const navigate = useNavigate();

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

      <h2>
        Bring <br /> the Christmas tree to life 🎄✨
      </h2>
      {/* <p style={{ color: "white" }}>
        We are waiting the unique sparkle of every one of you to bring festive
        glory!
      </p> */}

      {/* <button className="btn btn-danger" onClick={() => navigate("/list")}>
        Light it up! 🌟
      </button> */}
    </div>
  );
}

export default Support;
