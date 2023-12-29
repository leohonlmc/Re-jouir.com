import "../../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ChooseUs() {
  const data = [
    {
      title: "Christmas Blog",
      description: "Share up to 5 images about Christmas from your country!",
    },
    {
      title: "Connect the Globe",
      description: "We CAPTURE the Christmas spirit from around the globe.",
    },
    {
      title: "Share your Christmas",
      description: "Share your Christmas with the world!",
    },
    {
      title: "Guest Visit",
      description: "Don't need an account to share your Christmas moment!",
    },
  ];
  return (
    <div className="Home">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <br />
            <div className="section__title text-center title-mb-80">
              <h2 className="title why-rejouir">
                Why <span className="tg-text-gradient">choose Réjouir?</span>
              </h2>
            </div>
            <br />
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="position-relative">
          <div className="row justify-content-center">
            {data.map((item, index) => (
              <div
                className={`col-xl-3 col-lg-4 col-sm-6 a${index}`}
                key={index}
              >
                <div className="choose__item">
                  <div className="choose__item-count tg-text-gradient">
                    0{index + 1}.
                  </div>
                  <div className="choose__item-content">
                    <h3 className="title">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
