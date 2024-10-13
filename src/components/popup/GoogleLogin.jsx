import React from "react";
import "../../Account.scoped.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

const GoogleLoginDiv = () => {
  const createUser = async () => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/api/user`,
        {
          id: localStorage.getItem("id"),
          name: localStorage.getItem("name"),
          given_name: localStorage.getItem("given_name"),
          family_name: localStorage.getItem("family_name"),
          email: localStorage.getItem("email"),
          picture: localStorage.getItem("picture"),
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (data) {
        console.log("User created");
        window.location.reload();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      <GoogleLogin
        style={{ width: "100%" }}
        onSuccess={(credentialResponse) => {
          var decoded = jwtDecode(credentialResponse.credential);

          localStorage.setItem("id", decoded.sub);
          localStorage.setItem("name", decoded.name);
          localStorage.setItem("given_name", decoded.given_name);
          localStorage.setItem("family_name", decoded.family_name);
          localStorage.setItem("email", decoded.email);
          localStorage.setItem("picture", decoded.picture);
          createUser();
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </div>
  );
};

export default GoogleLoginDiv;
