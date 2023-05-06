import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const userInfo = await axios.post("/login", {
        email,
        password,
      });
      setUser(userInfo);

      alert("Login Successful. Now you can log in");

      setRedirect(true);
    } catch (e) {
      alert("Login fail fail. Please try again letter");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-3/4 mx-auto mt-4 grow flex items-center justify-around ">
      <div className="-mt-32">
        <h1 className="text-3xl  text-center  font-sans font-bold mb-4">
          Login
        </h1>
        <form className="max-w-lg mx-auto" onSubmit={submitLogin}>
          <input
            type="email"
            placeholder="your@email.com"
            className=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login primary">Login</button>
          <div className="text-center text-400 mt-4">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to="/register">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
