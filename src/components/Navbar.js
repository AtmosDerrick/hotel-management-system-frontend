import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import MenuButton from "../pages/MenuButton";
import DropdownMenu from "./DropdownMenu";

function Navbar() {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showMenuDisplay, setShowMenuDisplay] = useState(false);
  useEffect(() => {
    const getName = !!user && user.name;
    const getuserRole = !!user && user.role;
    setName(getName);
    setUserRole(getuserRole);
    console.log({ userRole });
    console.log(getName);
  }, [user]);

  const showMenu = () => {
    setShowMenuDisplay(!showMenuDisplay);
  };

  return (
    <div className="w-3/4 mx-auto py-2">
      <header className="p-4 flex justify-between">
        <Link
          to={userRole === "user" ? "/" : "/account"}
          className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-90">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <span className="font-bold uppercase text-lg">HomeNest</span>
        </Link>

        <div className="flex items-center gap-2  border border-gray-300  rounded-full py-2 px-4">
          <button onClick={showMenu} className="text-lg bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <Link
            to={
              userRole === "user"
                ? user
                  ? "useraccountprofile"
                  : "/login"
                : user
                ? "/account"
                : "/login"
            }
            className="bg-gray-500 text-white border border-gray-500  rounded-full overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-8 h-8 relative top-1">
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clip-rule="evenodd"
              />
            </svg>
          </Link>
          {!!user && <div>{name}</div>}
        </div>
      </header>

      {showMenuDisplay && <DropdownMenu />}
    </div>
  );
}

export default Navbar;
