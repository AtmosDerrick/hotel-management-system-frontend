import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MenuButton from "./MenuButton";
import Facilities from "../components/Facilities";

function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [activeFav, setActiveFav] = useState(false);
  const [search, setSearch] = useState("");
  const [defaultPlace, setDefaultPlace] = useState([]);
  const [roomAvailable, setRoomAvailable] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then((response) => {
      setDefaultPlace([...response.data]);

      setPlaces([...response.data]);
    });

    axios.get("/getforclientroomavailability").then((response) => {
      setRoomAvailable(response.data);
    });
  }, []);

  const addToFavourite = async (id) => {
    const updatedPlaces = places.map(async (place) => {
      if (id === place._id) {
        const updatedPlace = { ...place, activeFav: !place.activeFav }; // Toggle the `activeFav` property for the matching place

        if (updatedPlace.activeFav) {
          // Make the POST request to add the place to favorites
          try {
            const response = await axios.post("/favourite", {
              place: updatedPlace._id,
              owner: updatedPlace.owner,
            });
            console.log("Add to favorites response:", response.data);
          } catch (error) {
            console.error("Error adding place to favorites:", error);
            // Handle error
          }
        } else {
          console.log("deleted", updatedPlace._id);

          // axios delete request
          try {
            const response = await axios.delete(
              "/deletefavourite/" + updatedPlace._id
            );
            console.log("Remove from favorites response:", response.data);
          } catch (error) {
            console.error("Error removing place from favorites:", error);
            // Handle error
          }
        }

        return updatedPlace;
      }
      return place; // Return the unchanged place for other elements
    });

    const resolvedPlaces = await Promise.all(updatedPlaces); // Resolve the promises returned by map()

    setPlaces(resolvedPlaces);
  };

  const searchPlace = (e) => {
    e.preventDefault();
    const searchWords = search.toLowerCase().split(" ");

    const searchResult = places.filter((place) => {
      const addressWords = place.address.toLowerCase().split(" ");

      return searchWords.some((searchWord) =>
        addressWords.some((addressWord) => addressWord.includes(searchWord))
      );
    });

    setPlaces(searchResult);
  };

  console.log({ roomAvailable });

  const available = (id) => {
    const roomIds = roomAvailable.flat();

    return roomIds.includes(id);
  };

  return (
    <div>
      <div className="w-3/4 mx-auto flex justify-between gap-4 bg-gray-100 py-4 px-2">
        <div className="w-full">
          <button className="bg-primary w-1/2 p-4 rounded-2xl font-sans font-semibold text-white text-xl">
            <span>
              <i class="fa-solid fa-magnifying-glass-location fa-xl pr-2"></i>
            </span>
            Nearby Places
          </button>
        </div>
        <div className="shadow-md shadow-gray-300 border border-gray-300 w-full mx-auto  rounded-full py-1 px-4 font-medium">
          <form className="w-full gap-2 flex justify-between">
            <input
              type="text"
              placeholder="Search Town"
              className="w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value === "") {
                  setPlaces(defaultPlace); // Replace `defaultPlaces` with your default array of places
                }
              }}
            />
            <button
              className="text-gray-900 bg-transparent font-bold flex items-center"
              onClick={searchPlace}>
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>
      <Facilities
        places={places}
        setPlaces={setPlaces}
        defaultPlace={defaultPlace}
      />
      {console.log({ defaultPlace }, "aaaaa")}

      <div className="w-3/4 mt-8 mx-auto grid grid-cols-2 gap-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {places.length > 0 &&
          places.map((place) => (
            <div className="relative">
              {place.photos?.[0] && (
                <Link
                  to={available(place._id) ? "/place/" + place._id : "/"}
                  className="bg-gray-500 rounded-2xl flex mb-2">
                  <img
                    className={
                      available(place._id)
                        ? "rounded-2xl object-cover aspect-square "
                        : "rounded-2xl object-cover aspect-square  "
                    }
                    src={`http://localhost:5000/uploads/${place.photos?.[0]}`}
                    alt={place.title}
                  />
                </Link>
              )}
              <h3 className="font-bold">{place.address}</h3>
              <h2 className="text-sm truncate leading-4  "> {place.name}</h2>
              <h2 className="text-sm truncate leading-4  "> {place.title}</h2>

              <div className="mt-1">
                <span className="font-bold">Ghc {place.price}</span>
              </div>
              <div className=" absolute w-full top-2 right-1 left-1">
                <div className="absolute w-full flex justify-between px-2">
                  <div>
                    {!available(place._id) ? (
                      <div className="text-base font-semibold text-black bg-white px-2 rounded-md ">
                        Not Available
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {" "}
                    <button
                      onClick={() => addToFavourite(place._id)}
                      className="bg-white rounded-full p-2 ">
                      {!place.activeFav ? (
                        <i class="fa-sharp fa-regular fa-heart fa-lg"></i>
                      ) : (
                        <i class="fa-solid fa-heart fa-lg"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default IndexPage;
