import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import getGoogleUserDetails from "./reusables/getGoogleUserDetails";
import { useNavigate } from "react-router-dom";
import { LoginSocialFacebook, LoginSocialGithub } from "reactjs-social-login";

function SocialAuth({ user, setUser, loginStatus, setLoginStatus }) {
  const inputData = {};
  const navigateTo = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await getGoogleUserDetails(tokenResponse);
      console.log(response);
      inputData.email = response.data.email;
      inputData.firstName = response.data.given_name;
      inputData.lastName = response.data.family_name;
      inputData.picture = response.data.picture;
      inputData.socialSignUp = true;
      try {
        const response = await axios.post("http://localhost:8000/user/signup", {
          ...inputData,
        });
        if (response.data.msg) {
          console.log("hi");
          setUser(inputData);
          setLoginStatus(true);
          navigateTo("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const loginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        process.env.REACT_APP_GITHUB_CLIENT_ID
    );
  };

  return (
    <div className="social-auth d-flex justify-content-center">
      <i
        className="bi bi-google ms-3 fs-2 text-danger"
        onClick={googleLogin}
      ></i>
      <LoginSocialFacebook
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        onResolve={(response) => {
          console.log(response);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <i className="bi bi-facebook ms-3 fs-2 text-primary"></i>
      </LoginSocialFacebook>
      {/* <LoginSocialGithub
        client_id={process.env.REACT_APP_GITHUB_CLIENT_ID}
        client_secret={process.env.REACT_APP_GITHUB_CLIENT_SECRET}
        redirect_uri="http://localhost:3000"
        onResolve={(response) => {
          console.log(response);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <i className="bi bi-github ms-3 fs-2 text-secondary"></i>
      </LoginSocialGithub> */}
       <i className="bi bi-github ms-3 fs-2 text-secondary" onClick={loginWithGithub}></i>
    </div>
  );
}

export default SocialAuth;
