import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
        className=" text-center w-[93%] absolute top-0"
      >
        <i className="text-2xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl w-full p-2 font-semibold ">Choose a ride</h3>
      <div
        onClick={() => {
          props.setConfirmRidePanelOpen(true);
        }}
        className="flex border-1 border-gray-100  active:border-2 active:border-black mb-2 rounded-xl w-full p-1 items-center justify-around"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            ComfyGo{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-sm font-semibold">₹195.43</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanelOpen(true);
        }}
        className="flex border-1 border-gray-100  active:border-2 active:border-black mb-2 rounded-xl w-full p-1 items-center justify-around"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill">1</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable motorcycle rides
          </p>
        </div>
        <h2 className="text-sm font-semibold ">₹65.00</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanelOpen(true);
        }}
        className="flex  border-1 border-gray-100 active:border-2 active:border-black mb-2 rounded-xl w-full p-1 items-center justify-around"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            Comfy Auto{" "}
            <span>
              <i className="ri-user-3-fill">1</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable auto rides
          </p>
        </div>
        <h2 className="text-sm font-semibold ">₹118.23</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
