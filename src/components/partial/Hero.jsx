import "../../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import generateRandomUserId from "../functions/generateRandomUserId";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function Hero() {
  const countdownRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const guest = generateRandomUserId();
  const [isChristmas, setIsChristmas] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = lang || i18n.language;
  const navigate = useNavigate();

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

    const intervalId = setInterval(updateCountdown, 100);

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
    <div className="Home Hero">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6">
            <div
              className="banner__content"
              data-anime="opacity:[0, 1]; translateY:[24, 0]; onview: true; delay: 100;"
            >
              <img
                className="object"
                src="/assets/img/objects/circle-01.png"
                width="16"
                alt="object"
                style={{ top: "14%", left: "-8%" }}
              ></img>

              <img
                className="object"
                src="/assets/img/objects/circle-03.png"
                width="24"
                alt="object"
                style={{ bottom: "-16%", left: "12%" }}
              ></img>

              <img
                className="object"
                src="/assets/img/objects/x.png"
                width="28"
                alt="object"
                style={{ top: "-15%", right: "16%" }}
              />

              <h2 className="title">{t("share_your_precious_moment")}</h2>

              <div className="countdown" ref={countdownRef}>
                {" "}
                {isChristmas ? (
                  <p>{`December 25 ${new Date().getFullYear()} ⏳`}</p>
                ) : null}
                {isChristmas ? (
                  <div className="xmas-div">
                    <h1 className="xmas">
                      Merry <br /> Christmas! 🎅🏻
                      {/* Happy <br /> New Year! 🎉 */}
                    </h1>
                  </div>
                ) : (
                  <>
                    <div className="countdown-time days">
                      <div>{timeLeft.days}:</div>
                      <div>{t("days")}</div>
                    </div>
                    <div className="countdown-time">
                      <div>{timeLeft.hours}:</div>
                      <div>{t("hr")}</div>
                    </div>
                    <div className="countdown-time">
                      <div>{timeLeft.minutes}:</div>
                      <div>{t("min")}</div>
                    </div>
                    <div className="countdown-time second">
                      <div>{timeLeft.seconds}</div>
                      <div>{t("sec")}</div>
                    </div>
                  </>
                )}
              </div>
              <div className="start-btn">
                <Link to={`/${currentLang}/upload`}>
                  <button className="btn btn-danger">
                    {t("share_now")}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                    >
                      <path
                        fill="currentColor"
                        d="M17.92 6.62a1 1 0 0 0-.54-.54A1 1 0 0 0 17 6H7a1 1 0 0 0 0 2h7.59l-8.3 8.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L16 9.41V17a1 1 0 0 0 2 0V7a1 1 0 0 0-.08-.38"
                      />
                    </svg>
                  </button>
                </Link>

                <Link to={`/${currentLang}/about`}>
                  <button className="btn btn-outline">{t("learn_more")}</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner__images-grid-two">
              <img src="/tree-1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
