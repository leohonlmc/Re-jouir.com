import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import ChooseUs from "./partial/ChooseUs";
import PlaceToGo from "./partial/PlaceToGo";
import Hero from "./partial/Hero";
import Faq from "./partial/Faq";
import Song from "./partial/Song";
import ShareMoment from "./partial/ShareMoment";

function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isChristmas, setIsChristmas] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [waveMainClass, setWaveMainClass] = useState("wave-main");
  const { t } = useTranslation();

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

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [isChristmas]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setWaveMainClass("wave-main-mobile");
      } else {
        setWaveMainClass("wave-main");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
    <div className="Home background">
      <Helmet>
        <link rel="canonical" href="https://www.rejouirxmas.com" />
      </Helmet>

      <div className={waveMainClass}>
        <div
          className="header-section banner__background-wrap"
          style={{ paddingTop: "0px" }}
        >
          {timeLeft.days && timeLeft.days !== 0 ? (
            <Header
              title={t("share_your_precious_moment_title")}
              number="1"
              page=""
            />
          ) : (
            <Header title={``} page="" />
          )}
          <Hero />
        </div>

        <div>
          <ChooseUs />
        </div>

        <div>
          <ShareMoment />
        </div>

        <div>
          <PlaceToGo />
        </div>

        <div>
          <Song />
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
