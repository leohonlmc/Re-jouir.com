import "../../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function LoveXmas() {
  return (
    <div className="Home">
      <div className="d-flex flex-box">
        <div className="feature-img">
          <img src="/santa-2.png" alt="" style={{ width: "100%" }} />
        </div>
        <div className="feature">
          <div className="feature-child">
            <div className="section__title text-start">
              <h2 className="title">WE ❤️ CHRISTMAS, THAT's IT.</h2>
            </div>
            <p className="come-back-text">
              Come back every year to feel the Christmas spirit and share your
              Christmas moment with us. 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoveXmas;
