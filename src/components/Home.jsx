import "../App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faUserLargeSlash,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function updateCountdown() {
    const now = new Date();
    const christmas = new Date(now.getFullYear(), 11, 25);

    if (now > christmas) {
      christmas.setFullYear(christmas.getFullYear() + 1);
    }

    const diff = christmas - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  }

  return (
    <div className="Home">
      <div className="header-section">
        <Header />
        <div style={{ margin: "50px 0px" }}>
          <h1 className="slogan">Share your precious moment 🎄</h1>
        </div>
        <div className="countdown">
          <p>{`December 25 ${new Date().getFullYear()} ⏳`}</p>
          <div className="countdown-time days">
            <div>{timeLeft.days}:</div>
            <div>days</div>
          </div>
          <div className="countdown-time">
            <div>{timeLeft.hours}:</div>
            <div>hr</div>
          </div>
          <div className="countdown-time">
            <div>{timeLeft.minutes}:</div>
            <div>min</div>
          </div>
          <div className="countdown-time">
            <div>{timeLeft.seconds}</div>
            <div>sec</div>
          </div>
        </div>

        <div className="start-btn">
          <button className="btn btn-danger">Get Started</button>
          <button className="btn btn-outline-light">What is Réjouir?</button>
        </div>
      </div>

      <div className="main">
        <div className="mission-div">
          <div className="mission">
            <FontAwesomeIcon
              icon={faImages}
              size="2xl"
              style={{ color: "#dc3545" }}
            />
            <p style={{ margin: "0px", marginTop: "10px" }}>
              <strong>Christmas Blog</strong>{" "}
            </p>
            <p
              style={{
                width: "70%",
                textAlign: "center",
                margin: "auto",
                marginTop: "10px",
              }}
            >
              Share up to <strong>5 images</strong> about Christmas from your
              country!
            </p>
          </div>
          <div className="mission">
            <FontAwesomeIcon
              icon={faEarthAmericas}
              size="2xl"
              style={{ color: "#dc3545" }}
            />
            <p style={{ margin: "0px", marginTop: "10px" }}>
              <strong>Connect the Globe</strong>{" "}
            </p>
            <p
              style={{
                width: "70%",
                textAlign: "center",
                margin: "auto",
                marginTop: "10px",
              }}
            >
              We <strong>CAPTURE</strong> the Christmas spirit from around the
              globe.
            </p>
          </div>
          <div className="mission">
            <FontAwesomeIcon
              icon={faUserLargeSlash}
              size="2xl"
              style={{ color: "#dc3545" }}
            />
            <p style={{ margin: "0px", marginTop: "10px" }}>
              <strong>Guest Visit</strong>{" "}
            </p>
            <p
              style={{
                width: "70%",
                textAlign: "center",
                margin: "auto",
                marginTop: "10px",
              }}
            >
              Don't need an account to share your Christmas moment!
            </p>
          </div>
        </div>

        <div className="d-flex">
          <div className="feature-img">
            <img src="/moment-2.png" alt="" style={{ width: "100%" }} />
          </div>
          <div className="feature right">
            <div className="feature-child ">
              <h2>
                <strong>SHARE YOUR MOMENT 🎇</strong>
              </h2>
              <hr className="feature-hr" />
              <p>
                Share festive moments from around the globe in our Christmas
                blog without an account.
              </p>
            </div>
          </div>
        </div>

        <br />

        <div className="d-flex">
          <div className="feature-img">
            <img src="/christmas-tree.png" alt="" style={{ width: "100%" }} />
          </div>
          <div className="feature">
            <div className="feature-child">
              <h2>
                <strong>WE ❤️ CHRISTMAS, THAT's IT.</strong>
              </h2>
              <hr className="feature-hr" />
              <p>
                Come back every year to feel the Christmas spirit and share your
                Christmas moment with us. 🌟
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
