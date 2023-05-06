import React, { useEffect, useState } from "react";
import PerksLabel from "../components/PerksLabel";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

function PlacesFormPage() {
  //use param to get the nav id
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(100);
  const [name, setName] = useState("");
  const [redirectToPlaceList, setRedirectToPlaceList] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);

      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuest(data.maxGuest);
      setName(data.name);
      setPrice(data.price);
    });
  }, [id]);

  //added new places

  const savePlace = async (ev) => {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      name,
      price,
    };
    if (id) {
      //update
      await axios.put("/places", {
        id,
        ...placeData,
      });
    } else {
      //create
      await axios.post("/place", {
        ...placeData,
      });
    }

    setRedirectToPlaceList(true);
  };

  if (redirectToPlaceList) {
    return <Navigate to="/account/places" />;
  }

  //function for headers and labels
  const inputHeader = (text) => {
    return <h2 className="text-xl mt-4 ">{text}</h2>;
  };
  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  };

  return (
    <div>
      <div className="w-3/4 mx-auto">
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            "Title for your place, Should short and catchy as in advertisement"
          )}

          <input
            type="text"
            placeholder="title, for example: My lovely apartment"
            value={title}
            onChange={(ev) => {
              setTitle(ev.target.value);
            }}
          />
          {preInput("Name", "Nice Name = Better Result")}

          <input
            type="text"
            placeholder="title, for example: My lovely apartment"
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
            }}
          />
          {preInput("Address", "Address to this place")}

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          {preInput("Photos", "More = Better")}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          {preInput("Description", "Description of the place")}

          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <h2 className="text-xl mt-4 ">Perks</h2>
          <p className="text-gray-500 text-sm">
            Select all the perks of your place
          </p>
          <PerksLabel selected={perks} onChange={setPerks} />

          {preInput("Extra Info", "House Rules etc")}

          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {preInput(
            "Check in & out times",
            "add check in and out times, remember to have some time window for cleaning the room between guest"
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <h3 className="mt-2 -mb-1 ">Check in time </h3>
              <input
                type="text"
                placeholder="14"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 ">Check out time </h3>
              <input
                type="text"
                placeholder="11"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 ">Max number of guest </h3>
              <input
                type="number"
                placeholder="1"
                value={maxGuest}
                onChange={(ev) => setMaxGuest(ev.target.value)}
              />
            </div>

            <div>
              <h3 className="mt-2 -mb-1 ">Price Per Night</h3>
              <input
                type="number"
                placeholder="1"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>

          <button className="primary mt-4">Save</button>
        </form>
      </div>
    </div>
  );
}

export default PlacesFormPage;
