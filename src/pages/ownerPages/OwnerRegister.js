import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function OwnerRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("owner");

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/ownerregister", {
        name,
        role,
        email,

        password,
      });

      alert("Registration Successful. Now you can log in");
    } catch (e) {
      alert("Registration fail. Please try again letter");
    }
  }
  return (
    <div className="w-3/4 mx-auto mt-4 grow flex items-center justify-around ">
      <div className="-mt-32">
        <h1 className="text-3xl  text-center  font-sans font-bold mb-4">
          Register
        </h1>
        <form className="max-w-lg mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            className=""
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="your@email.com"
            className=""
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            className=""
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="login primaryowner">Login</button>
          <div className="text-center text-400 mt-4">
            Already a member?
            <Link className="underline text-black" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OwnerRegister;
