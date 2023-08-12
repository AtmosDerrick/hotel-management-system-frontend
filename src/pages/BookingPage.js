import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";
import BookingDates from "../components/BookingDates";
import Review from "../components/Review";
import GoogleMap from "../components/GoogleMap";

function BookingPage() {
  const { id } = useParams();
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get("/bookings")
        .then((response) => {
          const findBooking = response.data.find(({ _id }) => _id === id);
          if (findBooking) {
            setBookings(findBooking);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  if (!bookings) {
    return;
  }
  return (
    <div className="w-full px-2 lg:px-0 lg:w-3/4 mx-auto my-8">
      <h1 className="text-3xl py-2 font-bold ">{bookings.place.title}</h1>
      <AddressLink className={"flex  gap-2 my-2 font-sans font-semibold"}>
        {bookings.place.address}
      </AddressLink>
      <div className="bg-gray-200  mb-4 rounded-2xl py-8 px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-sans font-medium text-xl mb-2 ">
              Booking Info
            </h2>

            <BookingDates
              booking={bookings}
              className={"text-lg  flex gap-2 items-center "}
            />
            <div className="text-gray-700 font-semibold">
              Serial Number:
              <span className="mt-2 font-bold text-xl text-primary">
                {bookings._id}
              </span>
            </div>
          </div>
          <div className="text-lg font-semibold bg-primary p-6 text-white rounded-2xl">
            <div> Total Price:</div>
            <div className="text-3xl">Ghc {bookings.price}</div>
          </div>
        </div>
      </div>
      <PlaceGallery place={bookings.place} />
      <div className="mt-4 h-[30rem] mb-12 overflow-hidden">
        <div className="w-full text-xl font-semibold">Map and Direction</div>
        <GoogleMap bookings={bookings} />
      </div>
      <Review bookings={bookings} />
    </div>
  );
}

export default BookingPage;
