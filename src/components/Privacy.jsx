import "../About.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { Helmet } from "react-helmet";

function Privacy() {
  return (
    <div className="About">
      <div className="header-section-about">
        <Header title="Privacy Policy | Réjouir" />

        <Helmet>
          <link rel="canonical" href="https://www.rejouirxmas.com/privacy" />
        </Helmet>

        <br />
        <br />
        <h1 className="about-réjouir">
          <strong>Privacy Policy</strong>
        </h1>
      </div>
      <div className="about-main">
        <p>
          <strong>Last updated: 20 Oct 2023</strong>
        </p>

        <p>
          Welcome to{" "}
          <strong style={{ fontSize: "20px" }}>
            <span className="r-logo">R</span>éjouir
          </strong>
          ! This Privacy Policy describes how{" "}
          <strong style={{ fontSize: "20px" }}>
            <span className="r-logo">R</span>éjouir
          </strong>{" "}
          ("us", "we", or "our") collects, uses, and discloses your personal
          information when you use our Service.
        </p>

        <h2>1. Information Collection</h2>
        <p>
          We collect information that you provide to us directly, such as when
          you create an account, post content, or contact us. This can include
          your name, email address, and other personal details.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use your information to provide, maintain, and improve our Service,
          to respond to comments and questions, and to personalize user
          experience.
        </p>

        <h2>3. Data Protection</h2>
        <p>
          We use reasonable measures to help protect your personal information
          and ensure its security, but we cannot guarantee that unauthorized
          access, hacking, or other breaches will never occur.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>
          Our Service may include links to other websites or services that are
          not operated by us. We have no control over and are not responsible
          for the privacy policies of third-party services.
        </p>

        <h2>5. Changes to Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of changes by posting the new policy on this page and updating the
          "last updated" date. You are advised to review this page periodically
          for any changes.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at <a href="mailto:rejouirxmas@gmail.com">gmail</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Privacy;
