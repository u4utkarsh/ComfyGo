import rideModel from "../models/ride.model.js";
import { getDistanceAndTime } from "./maps.service.js";
import crypto from "crypto";

export const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceAndTime(pickup, destination);

  const { distance, duration } = distanceTime; //distance in meters, duration in seconds.

  const baseFares = {
    car: 50,
    auto: 30,
    bike: 20,
  };
  const perKmRates = {
    car: 15,
    auto: 10,
    bike: 7,
  };

  const perMinRates = {
    car: 2,
    auto: 1.5,
    bike: 1,
  };

  const distanceInKm = distance.value / 1000; // distance in km
  const durationInMin = duration.value / 60; // duration in minutes

  const fares = {
    car:
      baseFares.car +
      perKmRates.car * distanceInKm +
      perMinRates.car * durationInMin,
    auto:
      baseFares.auto +
      perKmRates.auto * distanceInKm +
      perMinRates.auto * durationInMin,
    bike:
      baseFares.bike +
      perKmRates.bike * distanceInKm +
      perMinRates.bike * durationInMin,
  };

  return fares;
};

const getOtp = (num) => {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
};

export const createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(4),
    fare: fare[vehicleType],
  });

  return ride;
};
