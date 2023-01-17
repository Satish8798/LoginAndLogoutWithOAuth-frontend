import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialAuth from "./SocialAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup({ user, setUser, loginStatus, setLoginStatus }) {
  //state to store the input data of signup form
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigateTo = useNavigate(); //hook used for navigating through routes

  //function to handle the signup form submission
  async function handleSubmit(e) {
    e.preventDefault(); // preventing the default functionality of form

    try {
      //post requesting the server api to register/save the user details if all provided details are valid
      const response = await axios.post("https://login-logout-oauth.onrender.com/user/signup", {
        ...inputData,
      });
      
      // check if response is provided
      if (response.data.msg) {
        //check the info provided by server
        if (response.data.info === "user already exists") {
          toast("user already exists! please login");
        }
        toast("signed up successfully! please login");
        setTimeout(() => {
          navigateTo("/auth/login"); //navigating to the login page after successfull registeration
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast("enter details correctly");
    }
  }
  return (
    <div>
      <h1>Welcome...! to Login-Logout OAuth App</h1>
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

        {/* signup form */}
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

           {/* toast that shows different messages based on server respones */}
          <ToastContainer />
        </form>

        <div className="or text-center">
          <p className="or-text fs-3">or</p>

          <p className="fs-1">continue with</p>
        </div>
        
        {/* providing the social login buttons */}
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
