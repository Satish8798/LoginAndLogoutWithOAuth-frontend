import { Navigation } from "@mui/icons-material";
import axios from "axios";
import React,{useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import photo from "../images/images.jpg"

function Home({ user, setUser, loginStatus, setLoginStatus }) {
  const navigateTo = useNavigate(); // hook for navigating through routes
  const [image,setImage] = useState('');
  const pictureRef = useRef();
  const submitImage = async ()=>{

    pictureRef.current.value='';
    const data = new FormData();
    data.append('file',image);
    data.append('upload_preset',"oauth-login");
    data.append('cloud_name','dvvitblng');

    try {
     let response = await fetch('https://api.cloudinary.com/v1_1/dvvitblng/image/upload',{
      method: 'post',
      body: data
     })
     response = await response.json();

      axios.put('https://login-logout-oauth.onrender.com/user/change-profile-picture',{
        picture: response.url,
        email: user.email,
      }).then(res=>{
        if(res.data){
          setUser({...user,picture:response.url});
        }
      }).catch(err=>console.log(err))

    } catch (error) {
      console.log(error);
    }
  }
  console.log(user.picture)
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
              boxShadow: "2px 2px 2px 5px blue",
            }}
          >
            <img
              src={user.picture? user.picture : photo}
              className="card-img-top m-2"
              alt="..."
              style={{
                borderRadius: "50%",
                width: 200,
                height: 200,
                border: "2px solid yellow",
              }}
            ></img>
            <input ref={pictureRef} type="file" accept="image/jpeg, image/jpg, image/png" onChange={(e)=>{ 
              setImage(e.target.files[0]);
            }}/>
             <button
                type="button"
                className="btn btn-warning w-50 ms-2 mt-2"
                onClick={submitImage}
              >
               change picture
              </button>
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
                 {/* todo page button */}
              <button
                type="button"
                className="btn btn-primary me-5"
                onClick={() => {
                 navigateTo('/todo')
                }}
              >
                Todo APP
              </button>
              {/* logout button */}
              <button
                type="button"
                className="btn btn-danger"
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
