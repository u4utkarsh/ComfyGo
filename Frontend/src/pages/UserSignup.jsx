import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      fullname: {
        firstName,
        lastName,
      },
      email,
      password,
    });

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
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
          <h3 className="text-base font-medium">What's your name</h3>
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
          <h3 className="text-base  font-medium ">What's your email</h3>
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
          <button
            type="submit"
            className="bg-[#111] text-white mt-2 mb-2 font-semibold  rounded-lg px-4 py-2 w-full text-lg "
          >
            Create Account
          </button>
        </form>
        <p className="text-center ">
          Already have a account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[0.6rem] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
