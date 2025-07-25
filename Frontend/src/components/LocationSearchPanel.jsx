import React from "react";

const LocationSearchPanel = (props) => {
  // sample array for locations
  const locations = [
    "Hostel No-1, GNDEC Ludhiana, Gill Park",
    "Hostel No-2, GNDEC Ludhiana, Gill Park",
    "Hostel No-3, GNDEC Ludhiana, Gill Park",
    "Hostel No-4, GNDEC Ludhiana, Gill Park",
  ];

  return (
    <div>
      {/* this is just sample data */}
      {locations.map((location, index) => {
        return (
          <div
            onClick={() => {
              props.setvehiclePanelOpen(true);
              props.setPanelOpen(false);
            }}
            key={index}
            className="flex gap-2 border-2 p-3 border-gray-50 active:border-black rounded items-center justify-start my-2"
          >
            <h2 className="bg-[#eee] w-8 h-8 rounded-full flex items-center justify-center ">
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
