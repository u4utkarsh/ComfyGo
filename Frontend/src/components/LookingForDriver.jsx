import React, { useEffect } from "react";

const LookingForDriver = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setWaitingForDriver(true);
      props.setVehicleFound(false);
      props.setVehiclePanelOpen(false);
    }, 10000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      <h5
        onClick={() => {
          props.setVehicleFound(false);
        }}
        className=" text-center w-[93%] absolute top-0"
      >
        <i className="text-2xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-xl w-full p-2 font-semibold ">
        Looking for nearby drivers
      </h3>
      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="ri-map-pin-3-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Hostel No-1</h3>
              <p className="text-sm -mt-1 text-gray-600">GNDEC Ludhiana</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Model Town, Ludhiana
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹195.43</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
