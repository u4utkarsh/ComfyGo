import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        // opacity: 1,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        // opacity: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber"
      ></img>

      <div className="h-screen  w-screen">
        {/* image for temporary usage */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="home background"
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            onClick={() => {
              setPanelOpen(false);
            }}
            ref={panelCloseRef}
            className="absolute opacity-0 right-5 top-4 text-2xl "
          >
            <i className=" ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-xl font-semibold">Find a trip</h4>
          <form
            className="relative"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[28%] left-4 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-8 py-2 w-full rounded-lg text-base mt-3"
              type="text"
              placeholder="Enter your pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-8 py-2 w-full rounded-lg text-base mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white h-0 ">
          <LocationSearchPanel
            setvehiclePanelOpen={setvehiclePanelOpen}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6"
      >
        <h5
          onClick={() => {
            setvehiclePanelOpen(false);
          }}
          className=" text-center w-[93%] absolute top-0"
        >
          <i className="text-2xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className="text-2xl w-full p-2 font-semibold ">Choose a ride</h3>
        <div className="flex border-1 border-gray-100  active:border-2 active:border-black mb-2 rounded-xl w-full p-1 items-center justify-around">
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
        <div className="flex border-1 border-gray-100  active:border-2 active:border-black mb-2 rounded-xl w-full p-1 items-center justify-around">
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
        <div className="flex  border-1 border-gray-100 active:border-2 active:border-black mb-2 rounded-xl w-full p-1 items-center justify-around">
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
    </div>
  );
};

export default Home;
