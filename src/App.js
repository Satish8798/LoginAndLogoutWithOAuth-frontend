import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  const [ loginStatus, setLoginStatus ] = useState(false);

  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              setUser={setUser}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            />
          }
        />
        <Route
          path="/auth/signup"
          element={
            <Signup
              user={user}
              setUser={setUser}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            />
          }
        />
        <Route
          path="/auth/login"
          element={
            <Login
              user={user}
              setUser={setUser}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
