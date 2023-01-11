import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialAuth from "./SocialAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup({ user, setUser, loginStatus, setLoginStatus }) {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://login-logout-oauth.onrender.com/user/signup", {
        ...inputData,
      });

      if (response.data.msg) {
        if (response.data.info === "user already exists") {
          toast("user already exists! please login");
        }
        toast("signed up successfully! please login");
        setTimeout(() => {
          navigateTo("/auth/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast("enter details correctly");
    }
  }
  return (
    <div>
      <h1>Welcome...! to Satish's App</h1>
      <div className="form-container">
        <div className="tabs">
          <p
            className="link"
            onClick={() => {
              navigateTo("/auth/login");
            }}
          >
            Login
          </p>
          <p className="link active">Signup</p>
        </div>
        <form className="signup-form mt-3" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control w-75 input"
              value={inputData.firstName}
              onChange={(e) => {
                setInputData({ ...inputData, firstName: e.target.value });
              }}
              required
            />
            <label>First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control w-75"
              value={inputData.lastName}
              onChange={(e) => {
                setInputData({ ...inputData, lastName: e.target.value });
              }}
              required
            />
            <label>Last Name</label>
          </div>
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
            Signup
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
        />
      </div>
    </div>
  );
}

export default Signup;
