import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import getGoogleUserDetails from "./reusables/getGoogleUserDetails";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

function SocialAuth({ user, setUser, loginStatus, setLoginStatus }) {
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  async function sendToServer(inputData) {
    try {
      const response = await axios.post(
        "https://login-logout-oauth.onrender.com/user/auth/social",
        {
          ...inputData,
        }
      );
      if (response.data.msg) {
        setUser(inputData);
        setLoginStatus(true);
        setLoading(false);
        toast("signing in");
        setTimeout(() => {
          navigateTo("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //google login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      const inputData = {};
      const response = await getGoogleUserDetails(tokenResponse);
      inputData.email = response.data.email;
      inputData.firstName = response.data.given_name;
      inputData.lastName = response.data.family_name;
      inputData.picture = response.data.picture;
      inputData.socialSignUp = true;
      inputData.provider = "google";
      sendToServer(inputData);
    },
  });

  //facebook login
  /*   async function FacebookLogin(response){
    const inputData = {};
    inputData.email = response.data.email;
    inputData.firstName = response.data.first_name;
    inputData.lastName = response.data.last_name;
    inputData.picture = response.data.picture.data.url;
    inputData.socialSignUp = true;
    inputData.provider='facebook';
    sendToServer(inputData);
  } */

  /*  //github login
  const loginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        process.env.REACT_APP_GITHUB_CLIENT_ID
    );
  }; */

  return (
    <div className="text-center">
      <div className="social-auth d-flex justify-content-center">
        <i
          className="bi bi-google ms-3 fs-2 text-danger"
          onClick={googleLogin}
        ></i>
        {/*   <LoginSocialFacebook
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        onResolve={(response) => {
          FacebookLogin(response);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <i className="bi bi-facebook ms-3 fs-2 text-primary"></i>
      </LoginSocialFacebook> */}

        {/*  <LoginSocialGithub
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
        <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`} >
        <i className="bi bi-github ms-3 fs-2 text-secondary"></i>
        </a>
        <ToastContainer />
      </div>
      {loading && (
        <div class="spinner-border text-warning mt-2" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default SocialAuth;
