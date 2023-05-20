import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import Placeimg from "../components/Placeimg";
import { differenceInCalendarDays, format } from "date-fns";
import BookingDates from "../components/BookingDates";
import MenuButton from "./MenuButton";

function OwnerActiveBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [defaultBookings, setDefaultBookings] = useState([]);

  useEffect(() => {
    axios.get("/owneractivebooking").then((respnose) => {
      setBookings(respnose.data);
      setDefaultBookings(respnose.data);
    });
  }, []);

  console.log({ defaultBookings });

  function verifySerialNumberOrName(e) {
    e.preventDefault();
    setBookings(defaultBookings);

    const verifyCustomer = defaultBookings.filter((book) => {
      const bookId = book._id.toLowerCase();
      const bookName = book.name.toLowerCase();
      const searchTerm = search.toLowerCase();
      return bookId === searchTerm || bookName === searchTerm;
    });

    setBookings(verifyCustomer);
  }

  return (
    <div className="w-3/4 mx-auto">
      <AccountNav />
      <div className="w-2/4 mx-auto mb-4">
        <form className="flex justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (search === "") {
                setBookings(defaultBookings);
              }
            }}
          />
          <button
            onClick={verifySerialNumberOrName}
            className="bg-primary rounded-2xl ml-4 px-6  font-bold text-white text-lg">
            Search
          </button>
        </form>
      </div>
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div
              className="flex  gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4"
              to={`/account/bookings/${booking._id}`}>
              <div className="w-48">
                <Placeimg place={booking.place} />
              </div>
              <div className="grow pr-3 mt-0 py-2">
                <h2 className="text-xl font-bold">{booking.place.title}</h2>
                <div className="flex justify-between">
                  <div className="text-xl font-bold">
                    Name:
                    <span className="text-primary"> {booking.name}</span>
                  </div>
                  <BookingDates
                    booking={booking}
                    className={
                      "text-lg font-semibold flex gap-2 items-center text-gray-900"
                    }
                  />

                  <div className="  py-1 text-lg font-bold">
                    <div className="flex gap-2">
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
                          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                      </svg>
                      {differenceInCalendarDays(
                        new Date(booking.checkOut),
                        new Date(booking.checkIn)
                      )}{" "}
                      Nights
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2 w-32 rounded-2xl text-white px-2 h-20 bg-primary text-lg font-bold items-center justify-between">
                    <div>
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
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                    </div>
                    <span className="text-xl ">Ghc {booking.price}</span>
                  </div>
                  <div className="flex justify-end text-xl text-red-500 font-sans font-semibold items-center">
                    <span className="px-2 text-black font-semibold">
                      Serial Number:
                    </span>{" "}
                    {booking._id}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default OwnerActiveBookings;
