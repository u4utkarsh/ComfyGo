import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber"
        ></img>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com "
          />
          <h3 className="text-lg font-medium mb-2">Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="bg-[#111] text-white mb-3 font-semibold  rounded px-4 py-2 w-full text-lg  "
          >
            Login
          </button>
        </form>
        <p className="text-center ">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] text-white flex justify-center items-center font-semibold mb-5 rounded px-4 py-2 w-full text-lg  "
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
