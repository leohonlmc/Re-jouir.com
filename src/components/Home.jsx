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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";

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
  const [isVisible, setIsVisible] = useState(false);

  const [waveMainClass, setWaveMainClass] = useState("wave-main");

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

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

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    // Handler to update the state based on window width
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setWaveMainClass("");
      } else {
        setWaveMainClass("wave-main");
      }
    };

    // Set the initial state based on the current window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []); // The empty array ensures this effect runs only once on mount

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="Home">
      <Helmet>
        <link rel="canonical" href="https://www.rejouirxmas.com" />
      </Helmet>

      <div className={waveMainClass}>
        <div className="header-section banner__background-wrap">
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

        <div>
          <ChooseUs />
        </div>

        <div>
          <PlaceToGo />
        </div>

        <div>
          <Song />
        </div>

        <div>
          <ShareMoment />
        </div>

        <div>
          <LoveXmas />
        </div>
        <div>
          <Faq />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
