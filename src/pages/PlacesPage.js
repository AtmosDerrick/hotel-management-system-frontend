import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesFormPage from "./PlacesFormPage";
import axios from "axios";
import AccountNav from "../components/AccountNav";

function PlacesPage() {
  const [places, setPlaces] = useState([]);

  //useffect to get places
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  // useEffect for checking subpage

  return (
    <div className="w-3/4 mx-auto">
      <AccountNav />
      <div>
        <div className="flex justify-center">
          <Link
            className="inline-flex  bg-primary text-white py-2 px-6 rounded-full text-center "
            to="/account/places/new">
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
        <div className="mt-4  ">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={"/account/places/" + place._id}
                className="grid grid-cols-[1fr_5fr] cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl mb-2 ">
                <div className="h-[10rem] w-[10rem] bg-gray-100   ">
                  {place.photos.length && (
                    <img
                      src={"http://localhost:5000/uploads/" + place.photos[0]}
                      alt=""
                      className="aspect-square object-cover w-full"
                    />
                  )}
                </div>
                <div className="text-base">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PlacesPage;
