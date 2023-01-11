import { useNavigate } from "react-router-dom";
import SocialAuth from "./SocialAuth";

function Signup({ user, setUser, loginStatus, setLoginStatus }) {
  const navigateTo = useNavigate();

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
        <form className="signup-form mt-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control w-75 input"
              placeholder="first name"
              required
            />
            <label>First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control w-75"
              placeholder="last name"
              required
            />
            <label>Last Name</label>
          </div>
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
            Signup
          </button>
        </form>
        <div className="or text-center">
          <p className="or-text fs-3">or</p>
          <p className="fs-1">Signup with</p>
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
