const axios = require("axios");

// Google Maps API Key (Replace with your actual key)
const GOOGLE_MAPS_API_KEY = "AIzaSyDuJYqP276xC-cu6Ee50uSrVL7Dw0eB0UI";

// Function to calculate distance using Google Maps API
const calculateDistance = async (origin, destination) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_API_KEY}`
    );
    return response.data.rows[0].elements[0].distance.value / 1000; // Distance in kilometers
  } catch (error) {
    console.error("Error calculating distance:", error);
    throw error;
  }
};

module.exports = { calculateDistance };
