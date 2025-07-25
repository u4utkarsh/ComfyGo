import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="ri-home-5-line"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="home background"
        />
      </div>
      <div className="h-1/2 p-4 fixed w-full z-10 bottom-0 px-3 py-6">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Piyush</h2>
            <h4 className="text-lg font-semibold -mt-1 -mb-1">BR 097 7123</h4>
            <p className="text-sm text-gray-600 ">Maruti Suzuki Swift</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-2 border-b-2 border-gray-200">
              <i className="text-lg ri-map-pin-fill"></i>
              <div>
                <h3 className="text-base font-medium">562/11-A</h3>
                <p className="text-xs -mt-1 text-gray-600">
                  Model Town, Ludhiana
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-2">
              <i className="ri-money-rupee-circle-line"></i>
              <div>
                <h3 className="text-base font-medium">₹195.43</h3>
                <p className="text-xs -mt-1 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full  bg-black text-white font-semibold p-2 rounded-lg">
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
