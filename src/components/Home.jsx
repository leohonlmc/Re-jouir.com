import "../App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";

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
          <div className="countdown-time">
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

      <Footer />
    </div>
  );
}

export default Home;
