import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Header from "../../components/partial/Header/Header";
import Footer from "../../components/partial/Footer/Footer";
import ChooseUs from "../../components/partial/ChooseUs";
// import PlaceToGo from "../../components/partial/PlaceToGo";
import Hero from "../../components/partial/Hero";
// import ShareMoment from "../../components/partial/ShareMoment";

function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isChristmas, setIsChristmas] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);
  const { t } = useTranslation();

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

    return () => {
      clearInterval(intervalId);
    };
  }, [isChristmas]);

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
    <div className="Home background main">
      <Helmet>
        <link rel="canonical" href="https://www.rejouirxmas.com" />
      </Helmet>

      <div className="section">
        <div
          className="header-section banner__background-wrap"
          style={{ paddingTop: "0px" }}
        >
          <Header
            title={t("share_your_precious_moment_title")}
            number="1"
            page=""
          />

          <Hero />
        </div>

        <div className="section">
          <ChooseUs />
        </div>

        <div></div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
