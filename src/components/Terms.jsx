import "../About.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { Helmet } from "react-helmet";

function Terms() {
  return (
    <div className="About">
      <div className="header-section-about">
        <Header title="Terms | Réjouir" />

        <Helmet>
          <link rel="canonical" href="https://www.rejouirxmas.com/terms" />
        </Helmet>

        <br />
        <br />
        <h1 className="about-réjouir">
          <strong>Terms & Conditions</strong>
        </h1>
      </div>
      <div className="about-main">
        <p>
          <strong>Last updated: 20 Oct 2023</strong>
        </p>

        <p>
          Thank you for choosing{" "}
          <strong style={{ fontSize: "20px" }}>
            <span className="r-logo">R</span>éjouir
          </strong>
          . Please read these Terms and Conditions ("Terms", "Terms and
          Conditions") carefully before using the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.rejouirxmas.com/"
          >
            Rejouirxmas.com
          </a>{" "}
          website ("Service") operated by Réjouir ("us", "we", or "our").
        </p>

        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing and using our Service, you agree to comply with and be
          bound by these Terms. If you disagree with any part of these terms,
          please do not use our Service.
        </p>

        <h2>2. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time, and without
          prior notice. By continuing to access or use our Service after those
          revisions become effective, you agree to be bound by the revised
          terms.
        </p>

        <h2>3. Termination</h2>
        <p>
          We reserve the right to terminate or suspend access to our Service at
          any time, without prior notice or liability, for any reason
          whatsoever, including, without limitation, if you breach these Terms.
        </p>

        <h2>Feedback and Contact</h2>
        <p>
          If you have any feedback or questions about these Terms, please
          contact us through{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:rejouirxmas@gmail.com"
          >
            gmail
          </a>
          .
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
