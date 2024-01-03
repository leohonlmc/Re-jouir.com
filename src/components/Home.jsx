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

  const top = useRef(null);
  const chooseUsRef = useRef(null);
  const placeToGoRef = useRef(null);
  const songRef = useRef(null);
  const shareMomentRef = useRef(null);
  const loveXmasRef = useRef(null);
  const faqRef = useRef(null);

  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const componentsRefs = [
    top,
    chooseUsRef,
    placeToGoRef,
    songRef,
    shareMomentRef,
    loveXmasRef,
    faqRef,
  ]; // Include all refs here
  const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);

  const handleScroll = (event) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? "down" : "up";

    let nextIndex = currentComponentIndex;

    if (
      direction === "down" &&
      currentComponentIndex < componentsRefs.length - 1
    ) {
      nextIndex = currentComponentIndex + 1;
    } else if (direction === "up" && currentComponentIndex > 0) {
      nextIndex = currentComponentIndex - 1;
    }

    if (nextIndex !== currentComponentIndex) {
      componentsRefs[nextIndex].current.scrollIntoView({ behavior: "smooth" });
      setCurrentComponentIndex(nextIndex);
    }
  };

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 1000); // Throttle the function to avoid rapid firing
    window.addEventListener("wheel", throttledHandleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", throttledHandleScroll);
    };
  }, [currentComponentIndex]);

  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  return (
    <div className="Home" style={{ paddingTop: "100px" }}>
      <Helmet>
        <link rel="canonical" href="https://www.rejouirxmas.com" />
      </Helmet>

      <div ref={top}>
        <div className="header-section banner__background-wrap ">
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
      </div>

      <div className="wave-main">
        <div className="wave-bottom">
          <div className="main">
            <div className="mission-div">
              <div ref={chooseUsRef}>
                <ChooseUs />
              </div>
              <br />
              <br />
              <br />
              <br />
              <div ref={placeToGoRef}>
                <PlaceToGo />
              </div>
              <br />
              <br />
              <div ref={songRef}>
                <Song />
              </div>
              <br />
              <br />
              <div ref={shareMomentRef}>
                <ShareMoment />
              </div>
              <br />
              <br />
              <div ref={loveXmasRef}>
                <LoveXmas />
              </div>
              <div ref={faqRef}>
                <Faq />
              </div>
              <br />
              <br />

              <div className="back-to-top-div" onClick={scrollToTop}>
                <FontAwesomeIcon
                  className="back-to-top"
                  icon={faCircleChevronUp}
                  size="2xl"
                />
                <p>BACK TO TOP</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
