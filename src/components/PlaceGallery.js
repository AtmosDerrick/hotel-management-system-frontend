import React, { useState } from "react";

function PlaceGallery({ place }) {
  const [showAllPhoto, setShowAllPhoto] = useState(false);

  if (showAllPhoto) {
    return (
      <div className="absolute bg-white inset-0 ">
        <div className="p-8 grid gap-4 bg-black ">
          <div className="w-3/4 mx-auto">
            <h2 className="text-3xl text-left font-semibold text-white">
              Photos of {place.name}
            </h2>
            <button
              onClick={() => {
                setShowAllPhoto(false);
              }}
              className="fixed flex gap-1 right-12 top-8 py-2 px-4 shadow shadow-black bg-white font-bold text-black rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close Photos
            </button>
          </div>{" "}
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img
                  className="w-3/4 mx-auto"
                  src={`http://localhost:5000/uploads/${photo}`}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        {" "}
        <div
          className="grid grid-cols-[2fr_1fr] gap-2 mt-2 rounded-2xl overflow-hidden
          ">
          <div className="">
            {place.photos?.[0] && (
              <div className="">
                <img
                  onClick={() => setShowAllPhoto(true)}
                  className="w-full h-full aspect-square object-cover bg-white"
                  src={"http://localhost:5000/uploads/" + place.photos[0]}
                  alt="hotel room"
                />
              </div>
            )}
          </div>
          <div className="grid ">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhoto(true)}
                className="aspect-square object-cover overflow-hidden"
                src={"http://localhost:5000/uploads/" + place.photos[1]}
                alt="hotel room"
              />
            )}
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhoto(true)}
                className="aspect-square object-cover overflow-hidden pt-2"
                src={"http://localhost:5000/uploads/" + place.photos[2]}
                alt="hotel room"
              />
            )}
          </div>
        </div>
      </div>
      <div className="relative">
        <button
          onClick={() => {
            setShowAllPhoto(true);
          }}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6">
            <path
              fill-rule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clip-rule="evenodd"
            />
          </svg>
          Show More Photos
        </button>
      </div>
    </div>
  );
}

export default PlaceGallery;
