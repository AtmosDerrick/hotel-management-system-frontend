import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import MenuButton from "./MenuButton";

function UserAccountProfile() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");

  //get a subpages
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");

    setRedirect("/");
    setUser(null);
  };

  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name}({user.email})<br></br>
          <button onClick={logout} className="max-w-sm primary mt-2">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
}

export default UserAccountProfile;
