import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesFormPage from "./PlacesFormPage";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import Placeimg from "../components/Placeimg";

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [roomAvailable, setRoomAvailable] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });

    axios.get("/getroomavailability").then(({ data }) => {
      setRoomAvailable(data);
    });
  }, []);

  const handleCheckboxChange = (roomId) => {
    const updatedRoomAvailable = roomAvailable.includes(roomId)
      ? roomAvailable.filter((id) => id !== roomId)
      : [...roomAvailable, roomId];

    setRoomAvailable(updatedRoomAvailable);
    axios
      .post("/roomavailability", { roomAvailable: updatedRoomAvailable })
      .then((response) => {
        console.log(response.data); // Handle the response data as needed
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isRoomAvailable = (roomId) => {
    return roomAvailable.includes(roomId);
  };

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
              <div
                className="grid grid-cols-[1fr_5fr] cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl mb-2 "
                key={place._id}>
                <div className="h-[10rem] w-[10rem] bg-gray-100   ">
                  <Placeimg place={place} />
                </div>
                <div className="text-base">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                  <div className="flex justify-between">
                    <div className="text-lg my-2 font-medium">
                      <form>
                        <label>Room Available: </label>
                        <input
                          type="checkbox"
                          checked={isRoomAvailable(place._id)}
                          onChange={() => {
                            handleCheckboxChange(place._id);
                          }}
                        />
                      </form>
                    </div>
                    <Link to={"/account/places/" + place._id}>
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PlacesPage;
