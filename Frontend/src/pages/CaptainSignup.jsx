import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainContext } from "../context/CaptainContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        vehicleType: vehicleType,
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleCapacity("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleType("");
  };
  return (
    <div>
      <div className="py-5 px-5 flex flex-col justify-between h-screen">
        <div>
          <img
            className="w-16 mb-4"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="uber"
          ></img>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-base font-medium">What's our Captain's name</h3>
            <div className="flex gap-2 mb-2">
              <input
                className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border-0  text-base placeholder:text-sm"
                required
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border-0 text-base placeholder:text-sm"
                required
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <h3 className="text-base  font-medium ">
              What's our Captain's email
            </h3>
            <input
              className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border-0 w-full text-base placeholder:text-sm"
              required
              type="email"
              placeholder="email@example.com "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <h3 className="text-base font-medium">Password</h3>
            <input
              className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border-0 w-full text-base placeholder:text-sm"
              required
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <h3 className="text-base font-medium">Vehicle Type</h3>
            <select
              className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border-0 w-full text-base"
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Select vehicle type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>

            <h3 className="text-base font-medium">Vehicle Color</h3>
            <input
              className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border-0 w-full text-base placeholder:text-sm"
              required
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />

            <h3 className="text-base font-medium">Vehicle Plate</h3>
            <input
              className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border-0 w-full text-base placeholder:text-sm"
              required
              type="text"
              placeholder="Vehicle Plate Number"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />

            <h3 className="text-base font-medium">Vehicle Capacity</h3>
            <input
              className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border-0 w-full text-base placeholder:text-sm"
              required
              type="number"
              min="1"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#111] text-white mt-2  font-semibold  rounded-lg px-4 py-2 w-full text-lg "
            >
              Create Account
            </button>
          </form>
          <p className="text-center mb-6 ">
            Already have a account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[0.6rem] leading-tight mb-2">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
