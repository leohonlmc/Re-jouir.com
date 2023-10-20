import "../Blog.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";

function Blog() {
  return (
    <div className="Blog">
      <div className="blog-section">
        <Header title="Blog | Réjouir" />
      </div>
      <div className="about-main"></div>
      <Footer />
    </div>
  );
}

export default Blog;
