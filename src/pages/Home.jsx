import React from "react";
import { useNavigate } from "react-router-dom";

function Home({ user, setUser, loginStatus, setLoginStatus }) {
  const navigateTo = useNavigate(); // hook for navigating through routes
  return (
    <div>
      {/* rendering different content based on loginStatus */}
      {loginStatus ? (
        <div>
          <h2>Welcome in!!! to the login-logout OAuth app</h2>
          {/* card that displays user details */}
          <div
            className="card"
            style={{
              width: "20rem",
              backgroundColor: "black",
              boxShadow: "2px 2px 2px 2px yellow",
            }}
          >
            <img
              src={user.picture? user.picture : `../images/defaultprofile`}
              className="card-img-top m-5"
              alt="..."
              style={{
                borderRadius: "50%",
                width: 200,
                border: "1px solid red",
              }}
            ></img>

            <div className="card-body">
              <h5 className="card-title">
                {user.firstName} {user.lastName}
              </h5>

              <p className="card-text">{user.email}</p>

              <p className="card-text">
                Some users might have kept their email private , so we cannot
                acceess them in oauth, naming in github is different(last name
                is not provied)
              </p>

              {/* logout button */}
              <button
                type="button"
                className="btn btn-danger mt-1"
                onClick={() => {
                  setLoginStatus(false);
                  setUser({});
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>you are not logged in yet</h1>

          <h1>please login to enter into Satish's App</h1>

          {/* button that navigates to login route */}
          <button
            className="btn btn-success mt-5"
            onClick={() => {
              navigateTo("/auth/login");
            }}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
