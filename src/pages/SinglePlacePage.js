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

  if (!place) {
    return;
  }

  return (
    <div className="w-full mt-8 bg-gray-100">
      <div className="w-3/4 mx-auto pt-4">
        <h1 className="text-3xl py-2 font-bold ">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />
      </div>

      <div className="w-3/4 mx-auto ">
        <ul className="grid grid-cols-5 my-4 gap-2">
          {place.perks.map((perk) => (
            <li
              className={`uppercase text-lg font-semibold text-gray-200 rounded-lg py-8  flex w-full  justify-center items-center  mx-2 w- bg-gray-900`}>
              {perk}
            </li>
          ))}
        </ul>
        <div className=" gap-6 mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4 ">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            Check In:
            {place.checkIn}
            <br></br>
            Check Out:
            {place.checkOut}
            <br></br>
            Max Guests: {place.maxGuest}
          </div>
          <div>
            <div className="bg-white shadow p-4 rounded-2xl ">
              <BookingWidget place={place} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 mx-auto mt-4 bg-white py-8 border-t">
        <div className="px-2 font-semibold text-2xl">
          <h2>Extra Info</h2>
        </div>
        <div className="px-2 text-sm text-gray-700 leading-4 mb-4 mt-2  ">
          {place.extraInfo}
        </div>
      </div>

      <div className="w-3/4 mx-auto mt-4">
        <div className=" ">
          <div className="text-2xl font-semibold">Comments and Review</div>
          {!!review &&
            review.map((rev) => (
              <div>
                <div>{rev.name}</div>
                <div>{rev.rating}</div>
                <div>{rev.comment}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SinglePlacePage;
