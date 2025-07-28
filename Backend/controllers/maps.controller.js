import { getAddressCoordinates } from "../services/maps.service.js";
import { getDistanceAndTime } from "../services/maps.service.js";
import { getAutoCompleteSuggestions } from "../services/maps.service.js";
import { validationResult } from "express-validator";

export const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinates(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

export const getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    const distanceTime = await getDistanceAndTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    res.status(404).json({ message: "Distance and time not found" });
  }
};

export const getAutoComplete = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    const suggestions = await getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(404).json({ message: "Suggestions not found" });
  }
};
