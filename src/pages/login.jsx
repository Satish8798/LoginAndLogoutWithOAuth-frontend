import React from "react";
import { useNavigate } from "react-router-dom";
import SocialAuth from "./SocialAuth";

function Login({ user, setUser, loginStatus, setLoginStatus }) {
  const navigateTo = useNavigate();

  return (
    <div>
      <h1>Welcome...! to Satish's App</h1>
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
        <form className="login-form mt-3">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control w-75"
              placeholder="name@example.com"
              required
            />
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control w-75"
              placeholder="Password"
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Login
          </button>
        </form>
        <div className="or text-center">
          <p className="or-text fs-3">or</p>
          <p className="fs-1">Log in with</p>
        </div>
        <SocialAuth
          user={user}
          setUser={setUser}
          loginStatus={loginStatus}
          setLoginStatus={setLoginStatus}
        />
      </div>
    </div>
  );
}

export default Login;
