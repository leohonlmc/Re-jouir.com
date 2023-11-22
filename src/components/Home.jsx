import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faUserLargeSlash,
  faEarthAmericas,
  faMapLocationDot,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import generateRandomUserId from "./functions/generateRandomUserId";
import Snowfall from "react-snowfall";
import { Helmet } from "react-helmet";

function Home() {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const countdownRef = useRef(null); // Ref for the countdown div

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
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

      <div className="header-section">
        {timeLeft.days && timeLeft.days !== 0 ? (
          <Header
            title={`(${timeLeft.days}) Share Your Precious Moment | Réjouir`}
          />
        ) : (
          <Header title={`Merry Christmas! 🌟 | Réjouir`} />
        )}

        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Snowfall
            color="white"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10000,
            }}
            snowflakeCount={100}
          />
        </div>

        <div style={{ margin: "50px 0px" }}>
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

        {/* <div ref={countdownRef} className="start-point"></div> */}

        <div className="start-btn">
          <Link to={"/list"}>
            <button className="btn btn-danger">Get Started</button>
          </Link>
          <Link to={"/about"}>
            <button className="btn btn-outline-light">What is Réjouir?</button>
          </Link>
        </div>

        <div className={isSticky ? "sticky" : "hidden"}>
          <div className="sticky-countdown">
            <strong>
              Counting down to{" "}
              <span style={{ color: "#fabc02" }}>Christmas</span> 🎅🏻🎄
            </strong>
            <br className="next-line" />
            <span className="countdown-span">{timeLeft.days} days</span>
            <span className="countdown-span">{timeLeft.hours} hours</span>
            <span className="countdown-span">{timeLeft.minutes} minutes</span>⏳
          </div>
        </div>
      </div>

      <div className="wave-main">
        <div className="wave-bottom">
          <div className="main">
            <div className="mission-div">
              <div className="divider-container">
                <hr className="divider-line" />
                <h1>
                  <strong>
                    <span className="r-logo">🎁 R</span>
                    <span className="éjouir">éjouir</span>{" "}
                    <span style={{ color: "grey" }}>·</span>{" "}
                    <span className="delight">Delight ⭐️</span>
                  </strong>
                </h1>
                <hr className="divider-line" />
              </div>

              <p className="introducing">Introducing our features</p>

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
                  Share up to <strong>5 images</strong> about Christmas from
                  your country!
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
                  We <strong>CAPTURE</strong> the Christmas spirit from around
                  the globe.
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

            <br />

            <div className="d-flex flex-box">
              <div className="feature-img">
                <img src="/moment-2.png" alt="" style={{ width: "100%" }} />
              </div>
              <div className="feature right">
                <div className="feature-child ">
                  <h2>
                    <strong>SHARE YOUR MOMENT 🎇</strong>
                  </h2>
                  <hr className="feature-hr" />

                  <p style={{ margin: "0px" }}>
                    Share festive moments from around the globe in our Christmas
                    blog without an account.
                  </p>

                  <br />

                  <div className="requirement-div">
                    <div className="requirement">
                      <FontAwesomeIcon
                        icon={faImages}
                        size="2xl"
                        style={{ color: "#dc3545", marginBottom: "10px" }}
                      />
                      <br />
                      <p>Nice images</p>
                    </div>
                    <div className="requirement">
                      <FontAwesomeIcon
                        icon={faMapLocationDot}
                        size="2xl"
                        style={{ color: "#dc3545", marginBottom: "10px" }}
                      />
                      <br />
                      <p>Location, country</p>
                    </div>
                    <div className="requirement">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="2xl"
                        style={{ color: "#dc3545", marginBottom: "10px" }}
                      />
                      <br />
                      <p>Title, description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />

            <div className="countries row">
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontWeight: "bold" }}>
                  Place you would like to go
                </h2>
                <p style={{ margin: "0px" }}>
                  More to find from our blog section!
                </p>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6 col-12 country-review ny">
                <div className="bottom-info">
                  <h4>United States</h4>
                  <h5>New York</h5>
                  <p>The Columbus Circle Holiday Market</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 country-review fr">
                <h4>France</h4>
                <h5>Broglie, Strasbourg</h5>
                <p>The Christkindelsmärik</p>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 country-review uk">
                <h4>United Kingdom</h4>
                <h5>Edinburgh, Scotland</h5>
                <p>Christmas Market</p>
              </div>
            </div>

            <br />

            {/* <div className="story">
              <div className="story-div">
                <img className="founder-img" src="/founder-1.jpeg" />{" "}
              </div>
              <div className="story-div user-info">
                <p style={{ margin: "0px" }}>FOUNDER</p>
                <a
                  href="https://www.linkedin.com/in/hon-leo-aa12881b2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    textDecoration: "none",
                    fontSize: "30px",
                  }}
                >
                  Leo Hon
                </a>
                <p style={{ margin: "0px" }}>
                  At Réjouir.com, we aim to encapsulate the global spirit of
                  Christmas. Our platform unites people, letting them share and
                  cherish their festive moments.
                </p>
              </div>
            </div> */}

            <br />
            <br />

            <div className="d-flex flex-box">
              <div className="feature-img">
                <img
                  src="/christmas-tree.png"
                  alt=""
                  style={{ width: "100%" }}
                />
              </div>
              <div className="feature">
                <div className="feature-child">
                  <h2>
                    <strong>WE ❤️ CHRISTMAS, THAT's IT.</strong>
                  </h2>
                  <hr className="feature-hr" />
                  <p>
                    Come back every year to feel the Christmas spirit and share
                    your Christmas moment with us. 🌟
                  </p>
                </div>
              </div>
            </div>

            <br />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
