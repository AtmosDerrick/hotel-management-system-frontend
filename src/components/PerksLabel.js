import React from "react";

function PerksLabel({ selected, onChange }) {
  const handleCheckboxClick = (ev) => {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  };
  return (
    <div>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-2">
        <label className="border p-4 flex rounded-2xl  gap-2 items-center w-full cursor-pointer ">
          <input
            type="checkbox"
            checked={selected.includes("wifi")}
            name="wifi"
            onChange={handleCheckboxClick}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6">
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
            />
          </svg>

          <span>Wifi</span>
        </label>
        <label className="border p-4 flex rounded-2xl  gap-2 items-center w-full cursor-pointer ">
          <input
            type="checkbox"
            checked={selected.includes("parking spot")}
            name="parking spot"
            onChange={handleCheckboxClick}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6">
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>

          <span>Parking Spot</span>
        </label>
        <label className="border p-4 flex rounded-2xl  gap-2 items-center w-full cursor-pointer ">
          <input
            type="checkbox"
            checked={selected.includes("double bed")}
            name="double bed"
            onChange={handleCheckboxClick}
          />
          <i class="fa-solid fa-bed"></i>
          <span>Double bed</span>
        </label>
        <label className="border p-4 flex rounded-2xl  gap-2 items-center w-full cursor-pointer ">
          <input
            type="checkbox"
            checked={selected.includes("air condition")}
            name="air condition"
            onChange={handleCheckboxClick}
          />
          <i class="fa-solid fa-temperature-low "></i>

          <span>Air condition</span>
        </label>
        <label className="border p-4 flex rounded-2xl  gap-2 items-center w-full cursor-pointer ">
          <input
            type="checkbox"
            checked={selected.includes("Restaurant")}
            name="Restaurant"
            onChange={handleCheckboxClick}
          />
          <i class="fa-solid fa-utensils fa-2x"></i>

          <span>Restaurant </span>
        </label>

        <label className="border p-4 flex rounded-2xl  gap-2 items-center w-full cursor-pointer ">
          <input
            type="checkbox"
            checked={selected.includes("Spa")}
            name="Spa"
            onChange={handleCheckboxClick}
          />
          <i class="fa-solid fa-spa "></i>

          <span>Spa</span>
        </label>

        <label className="border p-4 flex rounded-2xl  gap-2 items-center w-full cursor-pointer ">
          <input
            type="checkbox"
            checked={selected.includes("Event Space")}
            name="Event Space"
            onChange={handleCheckboxClick}
          />
          <i class="fa-solid fa-champagne-glasses "></i>

          <span>Spa</span>
        </label>
      </div>
    </div>
  );
}

export default PerksLabel;
