import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import Song from "./partial/Song";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import generateRandomUserId from "./functions/generateRandomUserId";
import Snowfall from "react-snowfall";
import { Helmet } from "react-helmet";
import ChooseUs from "./partial/ChooseUs";
import LoveXmas from "./partial/LoveXmas";
import PlaceToGo from "./partial/PlaceToGo";
import Snow from "./effect/Snow";

function Home() {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
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

  const handleScroll = () => {
    const countdownBottom =
      countdownRef.current.getBoundingClientRect().bottom + window.scrollY;
    const scrolledPastCountdown = window.scrollY > countdownBottom;
    setIsSticky(scrolledPastCountdown);
  };

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

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

        {/* <div style={{ margin: "50px 0px" }}>
          <h1 className="slogan">Share your precious moment 🎄</h1>
        </div>
        <div className="countdown" ref={countdownRef}>
          {" "}
          {isChristmas ? (
            <p>{`December 25 ${new Date().getFullYear()} ⏳`}</p>
          ) : null}
          {isChristmas ? (
            <div className="xmas-div">
              <h1 className="xmas">Merry Christmas! 🎅🏻</h1>
            </div>
          ) : (
            <>
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
              <div className="countdown-time second">
                <div>{timeLeft.seconds}</div>
                <div>sec</div>
              </div>
            </>
          )}
        </div>

        <div className="start-btn">
          <Link to={"/list"}>
            <button className="btn btn-danger">
              Let's get started{" "}
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
        </div> */}

        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <div
                class="banner__content"
                data-anime="opacity:[0, 1]; translateY:[24, 0]; onview: true; delay: 100;"
              >
                <h2 class="title">Share your precious moment</h2>
                {/* <p class="desc">
                  A 890 piece custom Nerko's collection is joining the NFT space
                  on Opensea.
                </p> */}
                <div className="countdown" ref={countdownRef}>
                  {" "}
                  {isChristmas ? (
                    <p>{`December 25 ${new Date().getFullYear()} ⏳`}</p>
                  ) : null}
                  {isChristmas ? (
                    <div className="xmas-div">
                      <h1 className="xmas">Merry Christmas! 🎅🏻</h1>
                    </div>
                  ) : (
                    <>
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
                      <div className="countdown-time second">
                        <div>{timeLeft.seconds}</div>
                        <div>sec</div>
                      </div>
                    </>
                  )}
                </div>
                <div className="start-btn">
                  <Link to={"/list"}>
                    <button className="btn btn-danger">
                      Let's get started{" "}
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
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div class="banner__images-grid-two">
                <img src="/tree-1.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className={isSticky ? "sticky" : "hidden"}>
          {isChristmas ? (
            <div className="sticky-countdown">
              <strong>🌟 Merry Christmas! 🎅🏻🎄</strong>
            </div>
          ) : (
            <div className="sticky-countdown">
              <strong>
                Counting down to{" "}
                <span style={{ color: "#fabc02" }}>Christmas</span> 🎅🏻🎄
              </strong>
              <br className="next-line" />
              <span className="countdown-span">{timeLeft.days} days</span>
              <span className="countdown-span">{timeLeft.hours} hours</span>
              <span className="countdown-span">{timeLeft.minutes} minutes</span>
              ⏳
            </div>
          )}
        </div>
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

              <div className="d-flex flex-box" style={{ padding: "20px" }}>
                <div className="feature-img">
                  <img src="/moment-2.png" alt="" style={{ width: "100%" }} />
                </div>
                <div className="feature right">
                  <div className="feature-child">
                    <div className="section__title text-start">
                      <span className="sub-title tg-text-gradient">
                        Sync and Track
                      </span>
                      <h2 className="title">SHARE YOUR MOMENT 🎇</h2>
                    </div>

                    <p className="share-moment-text">
                      Share festive moments from around the globe in our
                      Christmas blog without an account.
                    </p>

                    <div class="about__facts-list">
                      <div class="about__icon-box">
                        <div class="icon">
                          <FontAwesomeIcon icon={faImages} size="sm" />
                        </div>
                        <p>Nice images</p>
                      </div>
                      <div class="about__icon-box">
                        <div class="icon">
                          <FontAwesomeIcon icon={faMapLocationDot} size="sm" />
                        </div>
                        <p>Location, country &amp; description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <br />
              <PlaceToGo />
              <br />
              <br />
              <Song />
              <br />
              <br />
              <LoveXmas />
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
