import "../../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Snowfall from "react-snowfall";

function Snow() {
  return (
    <div className="Home">
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Snowfall
          color="white"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10000,
          }}
          snowflakeCount={100}
        />
      </div>
    </div>
  );
}

export default Snow;
