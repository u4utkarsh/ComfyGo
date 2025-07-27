import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }}
        className=" text-center w-[93%] absolute top-0"
      >
        <i className="text-2xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-xl w-full font-semibold ">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-gray-100 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://www.shutterstock.com/image-photo/handsome-smiling-young-man-portrait-260nw-2066727890.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium ">Ayush</h2>
        </div>
        <h5 className="text-base font-medium ">3.5 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full">
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
        <div className="mt-6 w-full">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              className="bg-[#eee] px-6 py-2 font-mono text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter OTP"
            />
            <Link
              to="/captain-riding"
              className="flex justify-center w-full mt-2 bg-black text-white font-semibold p-2 rounded-lg"
            >
              Confirm
            </Link>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="w-full mt-2 bg-red-600 text-white font-semibold p-2 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
