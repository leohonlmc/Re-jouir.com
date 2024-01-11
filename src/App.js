import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home, AboutUs, Blog, Terms, Privacy, List, Admin } from "./components";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/terms" element={<Terms />} />
        <Route exact path="/privacy" element={<Privacy />} />
        <Route exact path="/upload" element={<List />} />
        <Route
          exact
          path={`/admin/username/leohon/leohonlmc`}
          element={<Admin />}
        />
      </Routes>
    </Router>
  );
}
