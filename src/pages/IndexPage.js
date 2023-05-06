import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then((response) => {
      setPlaces([...response.data]);
    });
  }, []);

  return (
    <div className="w-3/4 mt-8 mx-auto grid grid-cols-2 gap-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id}>
            {place.photos?.[0] && (
              <div className="bg-gray-500 rounded-2xl flex mb-2">
                <img
                  className="rounded-2xl object-cover aspect-square "
                  src={`http://localhost:5000/uploads/${place.photos?.[0]}`}
                  alt={place.title}
                />
              </div>
            )}
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm truncate leading-4  "> {place.name}</h2>
            <h2 className="text-sm truncate leading-4  "> {place.title}</h2>

            <div className="mt-1">
              <span className="font-bold">Ghc {place.price}</span>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default IndexPage;
