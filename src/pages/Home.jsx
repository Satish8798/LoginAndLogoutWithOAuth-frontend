import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home({user,setUser,loginStatus,setLoginStatus}) {
    const navigateTo=useNavigate();

    if(!loginStatus){
        navigateTo("/auth/login")
    }
    console.log(user.picture)
  return (
    <div>
        <h1>Welcome {user.firstName} {user.lastName} to Satish's App</h1>
        <h2>Your email id is {user.email}</h2>
        <img src={user.picture} alt="profilepic" />
        <button type='button' className='btn btn-danger' onClick={()=>{
            setLoginStatus(false);
            setUser({})
        }}>Log out</button>
    </div>
  )
}

export default Home