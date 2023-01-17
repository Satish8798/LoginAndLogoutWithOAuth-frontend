import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import getGoogleUserDetails from "./reusables/getGoogleUserDetails";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SocialAuth({
  user,
  setUser,
  loginStatus,
  setLoginStatus,
  loading,
  setLoading,
}) {
  const navigateTo = useNavigate(); //hook that navigates to different routes

  //function to send the google user data to server
  async function sendToServer(inputData) {
    try {

      // post requesting the user data to server api
      const response = await axios.post(
        "https://login-logout-oauth.onrender.com/user/auth/social",
        {
          ...inputData,
        }
      );

      // check for successful response
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
      const response = await getGoogleUserDetails(tokenResponse); //calls a function that returns google user details
      inputData.email = response.data.email;
      inputData.firstName = response.data.given_name;
      inputData.lastName = response.data.family_name;
      inputData.picture = response.data.picture;
      inputData.socialSignUp = true;
      inputData.provider = "google";
      sendToServer(inputData);
    },
  });

  return (
    <div className="text-center">
      <div className="social-auth d-flex justify-content-center">
        {/* Google Login button */}
        <i
          className="bi bi-google ms-3 fs-2 text-danger"
          onClick={googleLogin}
        ></i>

        {/* Discord Login button */}
        <a
          href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=https%3A%2F%2Flogin-logout-oauth.onrender.com%2Fuser%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20email`}
        >
          <i className="bi bi-discord ms-3 fs-2 text-info"></i>
        </a>

        {/* Github login button */}
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}
        >
          <i className="bi bi-github ms-3 fs-2 text-secondary"></i>
        </a>

        {/* Facebook login button */}
        <a
          href={`https://www.facebook.com/v15.0/dialog/oauth?
          client_id=${process.env.REACT_APP_FACEBOOK_APP_ID}
          &redirect_uri=${encodeURIComponent(
            "https://login-logout-oauth.onrender.com/user/auth/facebook/redirect"
          )}`}
        >
          <i className="bi bi-facebook ms-3 fs-2 text-primary"></i>
        </a>

        <ToastContainer />
      </div>

      {loading && (
        <div className="spinner-border text-warning mt-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default SocialAuth;
