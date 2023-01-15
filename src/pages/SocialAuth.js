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
  const navigateTo = useNavigate();
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
    async function FacebookLogin(response){
    const inputData = {};
    inputData.email = response.data.email;
    inputData.firstName = response.data.first_name;
    inputData.lastName = response.data.last_name;
    inputData.picture = response.data.picture.data.url;
    inputData.socialSignUp = true;
    inputData.provider='facebook';
    sendToServer(inputData);
  }

  const facebook = ()=>{
    window.open("http://localhost:8000/user/auth/facebook","_self");
  }

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

<i className="bi bi-facebook ms-3 fs-2 text-primary" onClick={facebook}></i>


        <a
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}
        >
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
