import React, { useContext, useEffect, useState } from "react";
import { addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(2);
  const [name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfdays = 0;
  if (checkIn && checkOut) {
    numberOfdays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    if (!user) {
      return setRedirect("/login");
    } else {
      if (
        checkIn === "" ||
        checkOut === "" ||
        name === "" ||
        numberOfGuest === ""
      ) {
        return alert("Fill in the inputs");
      } else {
        const data = {
          checkIn,
          checkOut,
          numberOfGuest,
          name,
          owner: place.owner,
          mobile,
          place: place._id,

          price: numberOfdays * place.price,
        };
        const response = await axios.post("/bookings", {
          checkIn,
          checkOut,
          numberOfGuest,
          name,
          mobile,
          owner: place.owner,

          place: place._id,
          price: numberOfdays * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
      }
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className=" ">
        <div className="border rounded-2xl my-4">
          <div className="text-2xl text-center text-primary font-bold">
            Price: Ghc {place.price} / Per Night
          </div>
          <div className="flex ">
            {" "}
            <div className="my-0 py-2 px-4 mt-4  border-r-2 border-gray-400 ">
              <label>Check In:</label>
              <input
                type="date"
                className="border p-2 rounded-xl"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="my-4 py-2 px-4 mb-4 ">
              <label>Check Out:</label>
              <input
                type="date"
                className="border p-2 rounded-xl"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="my-0 py-2 px-4 mb-4 border-t-2 border-gray-400 ">
            <label>Number of Guest</label>
            <input
              type="number"
              value={numberOfGuest}
              onChange={(e) => setNumberOfGuest(e.target.value)}
            />
          </div>
        </div>

        {numberOfdays > 0 && (
          <div>
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
            />
          </div>
        )}

        <button className="primary bg-primary" onClick={bookThisPlace}>
          Book this Place{" "}
          {numberOfdays > 0 && <span>Ghc {numberOfdays * place.price}</span>}
        </button>
      </div>
    </div>
  );
}

export default BookingWidget;
