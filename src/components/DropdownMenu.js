import MenuButton from "../pages/MenuButton";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

import axios from "axios";

function DropdownMenu() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");
  const logout = async () => {
    await axios.post("/logout");

    setRedirect("/");
    setUser(null);
  };
  return (
    <div className="absolute w-full lg:w-1/4 bg-gray-100 lg:bg-opacity-90 rounded-2xl border border-2 lg:top-24 lg:right-36 z-50">
      <div className=" border-b-2 border-gray-500">
        {!user && (
          <Link
            className="py-2 px-6 inline-flex  text-gray-900 font-bold text-xl gap-2"
            to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Sign In
          </Link>
        )}
        {user ? (
          <div
            onClick={logout}
            className="py-2 px-6 flex  text-gray-900 font-bold text-xl gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </div>
        ) : (
          ""
        )}
      </div>
      {user && !!user.role && <MenuButton />}
    </div>
  );
}

export default DropdownMenu;
