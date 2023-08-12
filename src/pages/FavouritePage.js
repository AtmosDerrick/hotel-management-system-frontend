import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Placeimg from "../components/Placeimg";
import { differenceInCalendarDays, format } from "date-fns";
import BookingDates from "../components/BookingDates";
import MenuButton from "./MenuButton";

function FavouritePage() {
  const [favourite, setFavourite] = useState([]);
  const [activeFav, setActiveFav] = useState(false);
  const [defaultFavPlace, setDefaultFavPlace] = useState([]);
  useEffect(() => {
    axios.get("/getfavouriteplace").then((respnose) => {
      setFavourite(respnose.data);
      setDefaultFavPlace(respnose.data);
    });
  }, []);

  const deletefav = async (placeId) => {
    setFavourite(defaultFavPlace);
    try {
      const updatedPlace = { ...favourite };
      console.log(placeId);
      const response = await axios.delete("/deletefavourite/" + placeId);
      const filterFav = defaultFavPlace.filter((fav) => {
        return placeId !== fav.place._id;
      });
      console.log("Remove from favorites response:", response.data);
      setFavourite(filterFav);
      console.log({ favourite });
    } catch (error) {
      console.error("Error removing place from favorites:", error);
      // Handle error
    }
  };
  return (
    <div className="w-full xl:w-3/4 mx-4 lx:mx-auto">
      <div>
        {favourite?.length > 0 &&
          favourite.map((fav) => (
            <div className="flex relative  gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4">
              <div className="w-48">
                <Placeimg place={fav.place} />
              </div>
              <div className="">
                <div className="grow pr-3 mt-2 py-2">
                  <h2 className="text-xl font-bold">{fav.place.title}</h2>
                  <h3 className="text-lg font-mediumbold text-gray-700">
                    {fav.place.name}
                  </h3>
                  <h3 className="text-lg font-mediumbold text-gray-700 underline">
                    {fav.place.address}
                  </h3>
                  <h3 className="text-lg font-bold">
                    Price: Ghc {fav.place.price}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => {
                  deletefav(fav.place._id);
                }}
                className="absolute top-2 right-4 text-red-500 font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 bg-transparent">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FavouritePage;
