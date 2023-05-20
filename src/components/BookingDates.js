import React from "react";
import { differenceInCalendarDays, format } from "date-fns";

function BookingDates({ booking, className }) {
  return (
    <div>
      <div className={className}>
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
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
        <span className="pr-1">From:</span>{" "}
        {format(new Date(booking.checkIn), "yyyy-MM-dd")} &rarr;{" "}
        <span className="pr-1">To:</span>
        {format(new Date(booking.checkOut), "yyyy-MM-dd")}
      </div>
    </div>
  );
}

export default BookingDates;
