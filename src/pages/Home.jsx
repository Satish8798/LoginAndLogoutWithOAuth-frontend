import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home({user,setUser,loginStatus,setLoginStatus}) {
    const navigateTo=useNavigate();
  return (
    <div>
        {
            loginStatus? 
            (
                <div>
                    <h1>Welcome {user.firstName} {user.lastName} to Satish's App</h1>
        <h2>Your email id is {user.email}</h2>
        <img src={user.picture} alt="profilepic" />
        <br/>
        <button type='button' className='btn btn-danger mt-5' onClick={()=>{
            setLoginStatus(false);
            setUser({})
        }}>Log out</button>
                </div>
            ):(
                <div>
                    <h1>you are not logged in yet</h1>
                    <h1>please login to enter into Satish's App</h1>
                    <button className="btn btn-success mt-5" onClick={()=>{
                        navigateTo('/auth/login');
                    }}>Log in</button>
                </div>
            )
        }
    </div>
  )
}

export default Home