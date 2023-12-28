import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import Song from "./partial/Song";
import generateRandomUserId from "./functions/generateRandomUserId";
import { Helmet } from "react-helmet";
import ChooseUs from "./partial/ChooseUs";
import LoveXmas from "./partial/LoveXmas";
import PlaceToGo from "./partial/PlaceToGo";
import Snow from "./effect/Snow";
import Hero from "./partial/Hero";
import Faq from "./partial/Faq";
import ShareMoment from "./partial/ShareMoment";

function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const guest = generateRandomUserId();
  const [isChristmas, setIsChristmas] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);

  useEffect(() => {
    const today = new Date();

    localStorage.setItem("searchQuery", "");

    if (isChristmas) {
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 4000);

      return () => clearTimeout(timer);
    }

    if (today.getDate() === 25 && today.getMonth() === 11) {
      setIsChristmas(true);
    }

    const intervalId = setInterval(updateCountdown, 1000);

    if (localStorage.getItem("guest") === null) {
      localStorage.setItem("guest", guest);
    }

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
      <Helmet>
        <link rel="canonical" href="https://www.rejouirxmas.com" />
      </Helmet>

      {isChristmas && showCelebration && (
        <div className="celebration-overlay">
          {Array(200)
            .fill()
            .map((_, i) => (
              <span
                key={i}
                className="confetti"
                role="img"
                aria-label="Party popper"
                style={{
                  left: `${Math.random() * 100}vw`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              >
                🎉
              </span>
            ))}
        </div>
      )}

      <div className="header-section banner__background-wrap">
        <div class="background"></div>
        {timeLeft.days && timeLeft.days !== 0 ? (
          <Header
            title={`(${timeLeft.days}) Share Your Precious Moment | Réjouir`}
          />
        ) : (
          <Header title={`Merry Christmas! 🌟 | Réjouir`} />
        )}

        <Snow />

        <Hero />
      </div>

      <div className="wave-main">
        <div className="wave-bottom">
          <div className="main">
            <div className="mission-div">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-lg-10">
                    <br />
                    <div className="section__title text-center title-mb-80">
                      <h2 className="title why-rejouir">
                        Why{" "}
                        <span className="tg-text-gradient">
                          choose Réjouir?
                        </span>
                      </h2>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
              <br />
              <ChooseUs />
              <br />
              <br />

              <br />
              <br />
              <PlaceToGo />
              <br />
              <br />
              <Song />
              <br />
              <br />
              <ShareMoment />
              <br />
              <br />
              <LoveXmas />
              <Faq />
              <br />
              <br />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
