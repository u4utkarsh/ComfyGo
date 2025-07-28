import { getFare, createRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";

export const createRideController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await createRide({
      user: req.user.id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json({ ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 