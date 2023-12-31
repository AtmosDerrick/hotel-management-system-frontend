import React from "react";
import {
  Link,
  Navigate,
  useLocation,
  useParams,
  useRoutes,
} from "react-router-dom";

function MenuButton() {
  const { pathname } = useLocation();
  console.log({ pathname });

  let subpage = pathname;
  if (subpage === undefined) {
    subpage = "useraccountprofile";
  }
  //change the styling while click
  function linkClasses(type = null) {
    let classes =
      "py-2 px-6 inline-flex  text-gray-900 font-bold text-xl gap-2";
    if (type === subpage) {
      classes += " text-gray-900";
    }
    return classes;
  }
  return (
    <div>
      <ul className="w-full   mt-8  gap-4 mb-8">
        <li>
          <Link to="/favourite" className={linkClasses("/useraccountprofile")}>
            <span>
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </span>
            Favourite
          </Link>
        </li>

        <li>
          <Link to="/activebookings" className={linkClasses("/activebookings")}>
            <span>
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
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Active Bookings
          </Link>
        </li>
        <li>
          <Link to="/history" className={linkClasses("/history")}>
            <span>
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
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </span>
            History
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuButton;
