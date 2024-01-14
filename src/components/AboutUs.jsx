import "../About.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { Helmet } from "react-helmet";

function AboutUs() {
  return (
    <div className="About">
      <div className="header-section-about">
        <Header title="About Us | Réjouir" />

        <Helmet>
          <link rel="canonical" href="https://www.rejouirxmas.com/about" />
        </Helmet>

        <br />
        <br />
        <h1 className="about-réjouir">
          <strong>
            About <span className="r-logo">R</span>éjouir
          </strong>
        </h1>
      </div>
      <div className="about-main">
        <p>
          Welcome to{" "}
          <strong style={{ fontSize: "20px" }}>
            <span className="r-logo">R</span>ejouirxmas.com
          </strong>
          , where the magic of Christmas echoes from every corner of the globe.
          As a dedicated Christmas blog, we're more than just a festive site;
          we're a community brought together by the warmth, joy, and spirit of
          the holiday season.
        </p>

        <p>
          Our passion lies in capturing the essence of Christmas, no matter
          where it's celebrated. From the snow-kissed hills of Canada to the
          sunlit beaches of Australia, every region has its unique way of
          embracing the festive spirit, and we want to showcase it all.
        </p>

        <h2>Share and Cherish:</h2>
        <p>
          With Réjouir, you can share up to five enchanting Christmas images
          from your country, offering the world a glimpse into your unique
          celebrations.
        </p>

        <h2>Connect the Globe:</h2>
        <p>
          Our platform is designed to foster connections. Through shared
          moments, stories, and images, we bridge continents and cultures,
          weaving a tapestry of Christmas celebrations worldwide.
        </p>

        <h2>Guest Visit:</h2>
        <p>
          At Réjouir, we believe in the spirit of giving. That's why you don't
          need an account to share your cherished Christmas moments. Simply drop
          by, share, and spread the festive cheer!
        </p>

        <p>
          Join us in our journey as we celebrate, share, and connect the world
          through the timeless spirit of Christmas. Welcome to Réjouir.com.
        </p>

        <p>
          Founded and developed by{" "}
          <a href="https://www.linkedin.com/in/ming-chun-hon-aa12881b2/">
            Leo Hon
          </a>
          .
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
