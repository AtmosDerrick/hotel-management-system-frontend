import React from "react";

function Placeimg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "aspect-square object-cover w-full";
  }
  return (
    <div>
      {place.photos.length && (
        <img
          src={"http://localhost:5000/uploads/" + place.photos[index]}
          alt=""
          className={className}
        />
      )}
    </div>
  );
}

export default Placeimg;
