import "../About.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./partial/Header";
import Footer from "./partial/Footer";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

function Admin() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/pending/upload`)
      .then((res) => {
        if (res.data) {
          setPending(res.data.upload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="About">
      <div className="blog-section">
        <Header title="Admin | Réjouir" />
      </div>
      <div style={{ width: "95%", margin: "auto", padding: "30px 0px" }}>
        <h2 style={{ fontWeight: "bold" }}>New pending</h2>
      </div>

      <Footer />
    </div>
  );
}

export default Admin;
