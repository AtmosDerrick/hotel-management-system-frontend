import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

function SinglePlacePage() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [showAllPhoto, setShowAllPhoto] = useState(false);
  const [bookings, setBookings] = useState(null);
  const [perk, setPerk] = useState([]);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });

    axios.get(`/getuserrating/${id}`).then((response) => {
      setReview(response.data);
    });
  }, [id]);

  const getPerkIcon = (perk) => {
    switch (perk) {
      case "wifi":
        return <i className="fas fa-wifi px-2"></i>;
      case "Spa":
        return <i class="fa-solid fa-spa px-2"></i>;
      case "double bed":
        return <i class="fa-solid fa-bed px-2 "></i>;
      case "restuarant":
        return <i class="fa-solid fa-bed px-2 "></i>;
      case "air condition":
        return <i class="fa-solid fa-temperature-low px-2"></i>;
      case "Restaurant":
        return <i class="fa-solid fa-utensils px-2"></i>;

      // Add more cases for other perks and their respective icons
      default:
        return null;
    }
  };

  if (!place) {
    return;
  }

  return (
    <div className="w-full mt-8  py-2">
      <div className="w-full px-2 lg:px-0 lg:w-3/4 mx-auto pt-4">
        <h1 className="text-3xl py-2 font-bold ">{place.name}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />
      </div>

      <div className="w-full px-2 lg:px-0 lg:w-3/4 mx-auto ">
        <div className="text-lg italic font-semibold text-gray-900 pt-2 font-sans">
          What this place offers
        </div>
        <ul className="grid grid-cols-3 lg:grid-cols-5 my-4 gap-2">
          {place.perks.map((perk, index) => (
            <li
              className={`uppercase text-base lg:text-lg font-semibold  text-gray-200 rounded-lg py-4  flex w-full  justify-center items-center  mx-2  bg-primary`}
              key={index}>
              {getPerkIcon(perk)}
              {perk}
            </li>
          ))}
        </ul>
        <div className=" gap-6 mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <h1 className="text-2xl py-2 font-bold ">{place.title}</h1>
            <div className="flex justify-between text-xl border-b-2 py-4">
              <div>
                <span className="px-2">
                  <i class="fa-solid fa-person-shelter fa-lg text-primary"></i>
                </span>
                Check In :{place.checkIn}
              </div>
              <div>
                <span className="px-2">
                  <i class="fa-solid fa-door-open fa-lg text-primary"></i>
                </span>
                Check Out :{place.checkOut}
              </div>
              <div className="flex">
                <span className="px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                </span>
                Max Guests : {place.maxGuest}
              </div>
            </div>
            <div className="mt-8 ">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
          </div>
          <div>
            <div className="bg-white shadow p-4 rounded-2xl ">
              <BookingWidget place={place} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-2 lg:px-0 lg:w-3/4 mx-auto mt-4 bg-white py-8 border-t">
        <div className="px-2 font-semibold text-2xl">
          <h2>Extra Info</h2>
        </div>
        <div className="px-2 text-sm text-gray-700 leading-4 mb-4 mt-2  ">
          {place.extraInfo}
        </div>
      </div>

      <div className="w-full px-2 lg:px-0 lg:w-3/4 mx-auto mt-4">
        <div className=" ">
          <div className="text-2xl font-semibold">Comments and Review</div>
          {!!review &&
            review.map((rev) => (
              <div className="w-full lg:w-1/2 rounded-2xl   ">
                <div className=" font-semibold text-lg pl-2 text-primary">
                  {rev.name}
                </div>
                <div className="flex ">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <div key={stars} className="cursor-pointer  ">
                      {stars <= rev.rating ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 mx-1 text-gray-600">
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 mx-1">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                <div className=" text-base pl-2">"{rev.comment}"</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SinglePlacePage;
