import React, { useEffect, useState } from "react";

function Facilities({ places, setPlaces, defaultPlace }) {
  const [defaultPlaces, setDefaultPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [prevFilteredPlaces, setPrevFilteredPlaces] = useState([]);

  console.log({ defaultPlace }, "rrrrrrrrr");

  const selectFacility = (facility) => {
    console.log({ facility }, { filteredPlaces });
    setPlaces(defaultPlace);

    const filterPlaces = defaultPlace.filter((place) =>
      place.perks.includes(facility)
    );

    setPlaces(filterPlaces);
  };

  return (
    <div className="w-full xl:w-3/4 mx-auto flex justify-between h-auto py-1 lg:py-1 mt-8 border-b-2  border-b-gray-700  text-gray-700   px-4">
      <div
        className=" items-center h-12 gap-2 cursor-pointer"
        onClick={() => {
          selectFacility("double bed");
        }}>
        <div className="flex justify-center mb-2">
          <i class="fa-solid fa-bed fa-xl "></i>
        </div>
        <span className="text-lg font-sans hidden lg:block "> Double bed</span>
      </div>
      <div
        className=" items-center h-12 gap-2 cursor-pointer"
        onClick={() => selectFacility("Restaurant")}>
        <div className="flex justify-center mb-2">
          <i class="fa-solid fa-utensils fa-xl"></i>
        </div>
        <span className="text-lg font-sans hidden lg:block">
          {" "}
          Restuarant / Dinning
        </span>
      </div>
      <div
        className=" items-center h-12 gap-2 cursor-pointer"
        onClick={() => selectFacility("wifi")}>
        <div className="flex justify-center mb-2">
          <i class="fa-solid fa-wifi fa-xl"></i>
        </div>
        <span className="text-lg font-sans hidden lg:block"> Wifi</span>
      </div>

      <div
        className=" items-center h-12 gap-2 cursor-pointer"
        onClick={() => selectFacility("air condition")}>
        <div className="flex justify-center mb-2">
          <i class="fa-solid fa-temperature-low fa-xl"></i>
        </div>
        <span className="text-lg font-sans hidden lg:block">
          {" "}
          Air Condition
        </span>
      </div>

      <div
        className=" items-center h-12 gap-2 cursor-pointer"
        onClick={() => selectFacility("Spa")}>
        <div className="flex justify-center mb-2">
          <i class="fa-solid fa-spa fa-xl"></i>
        </div>
        <span className="text-lg font-sans hidden lg:block"> Spa</span>
      </div>

      <div
        className=" items-center h-12 gap-2 cursor-pointer"
        onClick={() => selectFacility("parking spot")}>
        <div className="flex justify-center mb-2">
          <i class="fa-solid fa-car fa-xl"></i>
        </div>
        <span className="text-lg font-sans hidden lg:block"> Car Park</span>
      </div>

      <div
        className=" items-center h-12 gap-2 cursor-pointer"
        onClick={() => selectFacility("Event Space")}>
        <div className="flex justify-center mb-2">
          <i class="fa-solid fa-champagne-glasses fa-xl"></i>
        </div>
        <span className="text-lg font-sans hidden lg:block"> Event Space</span>
      </div>
    </div>
  );
}

export default Facilities;
