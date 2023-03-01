import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SocialAuth from "./SocialAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login({ user, setUser, loginStatus, setLoginStatus }) {
  const search = useLocation().search; // getting the current URL

  const [loading, setLoading] = useState(false); // after successful authentication , state that shows the loading time for entering into homepage
  const [loginLoading, setLoginLoading] = useState(false); // loading for login 
  // getting the access tokens of github and discord from url which is redirected by server
  const githubAccessToken = new URLSearchParams(search).get("ghat");
  const discordAccessToken = new URLSearchParams(search).get("dat");

  const navigateTo = useNavigate(); //naviagte hook for navigating through routes

  // state that stores the input data of login form
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  // function for getting the github user details after successful authentication
  async function getGithubUser() {
    try {
      setLoading(true);

      //requesting the githup api using the access token
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: "token " + githubAccessToken,
        },
      });

      try {
        // requesting the server to save the user details in database
        const saveResponse = await axios.post(
          "https://login-logout-oauth.onrender.com/user/auth/social",
          {
            email: response.data.email,
            firstName: response.data.name,
            lastName: null,
            picture: response.data.avatar_url,
            socialSignUp: true,
            provider: "github",
          }
        );

        // check if the user gets saved successfully
        if (saveResponse.data.msg) {
          //setting the user details in user state to display user details in home page
          setUser({...saveResponse.data.user});

          //setting the neccessary states after successfull response
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
    } catch (error) {
      console.log(error);
    }
  }

  // function for getting the discord user details after successful authentication
  async function getDiscordUser() {
    try {
      setLoading(true);

      //requesting the discord api for getting the user details using the access token
      const response = await axios.get(
        "https://discord.com/api/v10/users/@me",
        {
          headers: {
            Authorization: "Bearer " + discordAccessToken,
          },
        }
      );

      try {
        //saving the discord user details in database
        const saveResponse = await axios.post(
          "https://login-logout-oauth.onrender.com/user/auth/social",
          {
            email: response.data.email,
            firstName: response.data.username,
            lastName: null,
            picture: `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.jpg`,
            socialSignUp: true,
            provider: "discord",
          }
        );

        // check if the user gets saved successfully
        if (saveResponse.data.msg) {
          console.log(saveResponse.data)
          setUser({...saveResponse.data.user});

          // setting the necessary states after successfull response
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
    } catch (error) {
      console.log(error);
    }
  }

  //useEffecthook
  useEffect(() => {
    // check the url has which token in it?
    if (githubAccessToken) {
      getGithubUser();
    } else if (discordAccessToken) {
      getDiscordUser();
    }
  }, []);

  //funtion that handles the login form submission
  async function handleSubmit(e) {
    e.preventDefault(); // preventing the default functionality of form

    setLoginLoading(true);

    try {
      //post requesting the server api to validate the login details
      const response = await axios.post(
        "https://login-logout-oauth.onrender.com/user/login",
        {
          ...inputData,
        }
      );

      // check if the response is successfull
      if (response.data.msg) {

        // setting the necessary states aftrr successfull response
        setUser(response.data.userDetails);
        setLoginStatus(true);
        toast("logging in...!");
        setTimeout(() => {
          setLoginLoading(false);
          navigateTo("/");
        }, 2000);
      }
    } catch (error) {
     setLoginLoading(false);
      toast("inavlid details");
    }
  }

  return (
    <div className="col-12 d-flex flex-column justify-content-center align-items-center">
      <h1 style={{textShadow:"2px 2px 2px red"}}>OAUTH-TODO APP</h1>
      <div className="form-container">
        <div className="tabs">
          <p className="link active">Login</p>
          <p
            className="link"
            onClick={() => {
              navigateTo("/auth/signup");
            }}
          >
            Signup
          </p>
        </div>

        {/* login form */}
        <form className="login-form mt-3" onSubmit={handleSubmit}>
          <div className="form-floating mb-2">
            <input
              type="email"
              className="form-control w-75"
              value={inputData.email}
              onChange={(e) => {
                setInputData({ ...inputData, email: e.target.value });
              }}
              required
            />
            <label>Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control w-75"
              value={inputData.password}
              onChange={(e) => {
                setInputData({ ...inputData, password: e.target.value });
              }}
              required
            />
            <label>Password</label>
          </div>

          <button type="submit" className="btn btn-success mt-2 w-50"  disabled= {loginLoading}>
            {loginLoading? 
            (
              <div className="spinner-border text-warning mt-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
            )  : `Login`
          }
          </button>
          <br />
          <button type="button" className="btn btn-success mt-2 w-50" 
          onClick={()=>{
            setInputData({ password: "Guest@123#123" , email: "guest@gmail.com" });
          }}>
            Guest Login
          </button>

              {/* toast that shows different messages based on server respones */}
          <ToastContainer />

        </form>

        <div className="or text-center">
          <p className="or-text fs-3">or</p>

          <p className="fs-6">continue with</p>
        </div>

        {/* providing the social login buttons */}
        <SocialAuth
          user={user}
          setUser={setUser}
          loginStatus={loginStatus}
          setLoginStatus={setLoginStatus}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}

export default Login;
