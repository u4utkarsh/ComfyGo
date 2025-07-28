import axios from "axios";

export async function getAddressCoordinates(address) {
  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey) {
    throw new Error("Google Maps API key not set in environment variables.");
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;
  try {
    const response = await axios.get(url, {
      params: {
        address,
        key: apiKey,
      },
    });
    if (
      response.data.status === "OK" &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const location = response.data.results[0].geometry.location;
      return { ltd: location.lat, long: location.lng };
    } else {
      throw new Error("No results found for the given address.");
    }
  } catch (error) {
    throw new Error(`Failed to fetch coordinates: ${error.message}`);
  }
}

export async function getDistanceAndTime(origin, destination) {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey) {
    throw new Error("Google Maps API key not set in environment variables.");
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;
  try {
    const response = await axios.get(url, {
      params: {
        origins: origin,
        destinations: destination,
        key: apiKey,
      },
    });
    if (
      response.data.status === "OK" &&
      response.data.rows &&
      response.data.rows.length > 0
    ) {
      const element = response.data.rows[0].elements[0];
      return {
        distance: element.distance,
        duration: element.duration,
      };
    } else {
      throw new Error("No results found for the given locations.");
    }
  } catch (error) {
    throw new Error(`Failed to fetch distance and time: ${error.message}`);
  }
}

export async function getAutoCompleteSuggestions(input) {
  if (!input) {
    throw new Error("query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey) {
    throw new Error("Google Maps API key not set in environment variables.");
  }
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
  try {
    const response = await axios.get(url, {
      params: {
        input,
        key: apiKey,
      },
    });
    if (
      response.data.status === "OK" &&
      response.data.predictions &&
      response.data.predictions.length > 0
    ) {
      return response.data.predictions;
    } else {
      throw new Error("No suggestions found for the given address.");
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch autocomplete suggestions: ${error.message}`
    );
  }
}
