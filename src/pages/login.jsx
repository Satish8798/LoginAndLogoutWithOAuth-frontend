import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import SocialAuth from "./SocialAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login({ user, setUser, loginStatus, setLoginStatus }) {
  // const search = useLocation().search;
  const [loading, setLoading] = useState(false);
  // const githubAccessToken = new URLSearchParams(search).get("gh_access_token");
  const {githubAccessToken}= useParams();
  const navigateTo = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  async function getGithubUser() {
    try {
      setLoading(true);
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: "token " + githubAccessToken,
        },
      });
      try {
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
        if (saveResponse.data.msg) {
          setUser({
            email: response.data.email,
            firstName: response.data.name,
            lastName: null,
            picture: response.data.avatar_url,
          });
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
  useEffect(() => {
    if (githubAccessToken) {
      getGithubUser();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://login-logout-oauth.onrender.com/user/login",
        {
          ...inputData,
        }
      );

      if (response.data.msg) {
        setUser(response.data.userDetails);
        setLoginStatus(true);
        toast("logging in...!");
        setTimeout(() => {
          navigateTo("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast("inavlid details");
    }
  }

  return (
    <div>
      <h1>Welcome...! to Login-Logout OAuth App</h1>
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
        <form className="login-form mt-3" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
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
          <button type="submit" className="btn btn-success mt-3">
            Login
          </button>
          <ToastContainer />
        </form>
        <div className="or text-center">
          <p className="or-text fs-3">or</p>
          <p className="fs-1">continue with</p>
        </div>
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
