import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Blog from "./pages/Blog/Blog";
import Post from "./pages/Post/Post";
import AboutUs from "./pages/About/AboutUs";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/Privacy/Privacy";
import Shop from "./pages/Shop/Shop";
import List from "./pages/List/List";
import AppStateProvider from "./Context/AppStateProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./config/i18n";

const LanguageWrapper = ({ children }) => {
  const { i18n } = useTranslation();
  const { lang } = useParams();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return children;
};

export default function App() {
  return (
    <AppStateProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTKEY}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/en" replace />} />
            <Route
              path="/:lang"
              element={
                <LanguageWrapper>
                  <Home />
                </LanguageWrapper>
              }
            />
            <Route
              path="/:lang/about"
              element={
                <LanguageWrapper>
                  <AboutUs />
                </LanguageWrapper>
              }
            />
            <Route
              path="/:lang/blog"
              element={
                <LanguageWrapper>
                  <Blog />
                </LanguageWrapper>
              }
            />
            <Route
              path="/:lang/terms"
              element={
                <LanguageWrapper>
                  <Terms />
                </LanguageWrapper>
              }
            />
            <Route
              path="/:lang/privacy"
              element={
                <LanguageWrapper>
                  <Privacy />
                </LanguageWrapper>
              }
            />
            <Route
              path="/:lang/upload"
              element={
                <LanguageWrapper>
                  <List />
                </LanguageWrapper>
              }
            />
            <Route
              path="/:lang/post/:id"
              element={
                <LanguageWrapper>
                  <Post />
                </LanguageWrapper>
              }
            />
            <Route
              path="/:lang/shop"
              element={
                <LanguageWrapper>
                  <Shop />
                </LanguageWrapper>
              }
            />
            <Route
              path="/admin/username/leohon/leohonlmc"
              element={
                <LanguageWrapper>
                  <Admin />
                </LanguageWrapper>
              }
            />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </AppStateProvider>
  );
}
