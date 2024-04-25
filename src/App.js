import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home, AboutUs, Blog, Terms, Privacy, List, Admin } from "./components";
import Post from "./components/post/Post";
import Shop from "./components/shop/Shop";
import AppStateProvider from "./Context/AppStateProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <AppStateProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTKEY}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/terms" element={<Terms />} />
            <Route exact path="/privacy" element={<Privacy />} />
            <Route exact path="/upload" element={<List />} />
            <Route exact path="/post/:id" element={<Post />} />
            <Route exact path="/shop" element={<Shop />} />
            <Route
              exact
              path={`/admin/username/leohon/leohonlmc`}
              element={<Admin />}
            />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </AppStateProvider>
  );
}
