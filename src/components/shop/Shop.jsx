import "./Shop.scoped.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../partial/Header";
import Footer from "../partial/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

function Shop() {
  return (
    <div className="Shop background">
      <Header />

      <Footer />
    </div>
  );
}

export default Shop;
