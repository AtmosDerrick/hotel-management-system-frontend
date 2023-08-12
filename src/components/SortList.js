import React, { useState, useEffect } from "react";

function SortList({ setPlaces, places }) {
  const [roomType, setRoomType] = useState(false);
  const [priceSort, setPriceSort] = useState(false);
  const [defaultPlaces, setDefaultPlaces] = useState([]);

  useEffect(() => {
    setDefaultPlaces(places);
  }, []);

  const sortToDefault = () => {
    setPlaces(defaultPlaces);
    console.log(defaultPlaces);
  };

  const viewMore = (type) => {
    switch (type) {
      case "place":
        setRoomType(!roomType);
        break;
      case "price":
        setPriceSort(!priceSort);
        break;
    }
  };

  const SortList = (type) => {
    switch (type) {
      case "5":
        setPlaces(
          places.filter((place) => {
            return place.level === "5";
          })
        );
        console.log({ type });
        break;

      case "4":
        setPlaces(
          places.filter((place) => {
            return place.level === "4";
          })
        );
        break;

      case "3":
        setPlaces(
          places.filter((place) => {
            return place.level === "3";
          })
        );
        break;

      case "2":
        setPlaces(
          places.filter((place) => {
            return place.level === "2";
          })
        );
        break;

      case "1":
        setPlaces(
          places.filter((place) => {
            return place.level === "1";
          })
        );
        break;

      case "50-100":
        setPlaces(
          places.filter((place) => {
            return place.price > 50 && place.place < 100;
          })
        );
        break;

        console.log("50-100");
        break;

      default:
        setPlaces(places);
    }
  };

  return (
    <div className="absolute w-full lg:w-1/4 bg-gray-100 lg:bg-opacity-90 rounded-2xl border border-2 lg:top-48  lg:right-48 h-3/4 z-50">
      <ul className="text-lg font-semibold p-2">
        <li>
          <div className="text-xl font-bold py-4">Sort Place place type</div>
          <ul className="w-3/4 flex justify-between">
            <li
              onClick={() => {
                SortList("5");
              }}>
              <div>
                <span>5</span>
                <i class="fa-solid fa-star"></i>
              </div>
            </li>
            <li
              onClick={() => {
                SortList("4");
              }}>
              <div>
                <span>4</span>
                <i class="fa-solid fa-star"></i>
              </div>
            </li>
            <li
              onClick={() => {
                SortList("3");
              }}>
              <div>
                <span>3</span>

                <i class="fa-solid fa-star"></i>
              </div>
            </li>
            <li
              onClick={() => {
                SortList("2");
              }}>
              <div>
                <span>2</span>
                <i class="fa-solid fa-star"></i>
              </div>
            </li>
            <li
              onClick={() => {
                SortList("1");
              }}>
              <div>
                <span>1</span>
                <i class="fa-solid fa-star"></i>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div className="text-xl font-bold py-4">Price </div>
          <p>Price per night</p>

          <div>
            <ul>
              <li
                onClick={() => {
                  SortList("50-100");
                }}
                className="py-2 hover:cursor-pointer">
                Ghc 50 - Ghc 100
              </li>
              <li
                onClick={() => {
                  SortList("110-200");
                }}
                className="py-2 hover:cursor-pointer">
                Ghc 110 - Ghc 200
              </li>
              <li
                onClick={() => {
                  SortList("210-300");
                }}
                className="py-2 hover:cursor-pointer">
                Ghc 210 - Ghc 300
              </li>
              <li
                onClick={() => {
                  SortList("310-400");
                }}
                className="py-2 hover:cursor-pointer">
                Ghc 310 - Ghc 400
              </li>
              <li
                onClick={() => {
                  SortList("410-500");
                }}
                className="py-2 hover:cursor-pointer">
                Ghc 410 - Ghc 500
              </li>
              <li
                onClick={() => {
                  SortList("510-600");
                }}
                className="py-2 hover:cursor-pointer">
                Ghc 510 - Ghc 600
              </li>
              <li>
                {" "}
                <button
                  className="w-full py-2 bg-primary text-white rounded-2xl flex justify-center"
                  onClick={sortToDefault}>
                  Default
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SortList;
