const { Pricing } = require("../models/pricingModel");
const { calculateDistance } = require("../utils/googleApi");
const pricingController = async (req, res) => {
  try {
    const { origin, destination, vehicleType } = req.body;

    if (!origin || !destination || !vehicleType) {
      return res
        .status(400)
        .json({ error: "Origin, destination, and vehicleType are required" });
    }

    const distance = await calculateDistance(origin, destination);

    if (distance > 1000) {
      return res
        .status(200)
        .json({ email_required: false, message: "Too far to offer ride" });
    }

    const pricing = await Pricing.findOne({ city: destination, vehicleType });

    if (!pricing) {
      return res.status(400).json({
        error: `No pricing information found for city: ${destination} and vehicleType: ${vehicleType}`,
      });
    }

    const price =
      pricing.baseAmount +
      (distance > pricing.baseKm
        ? (distance - pricing.baseKm) * pricing.amountPerKm
        : 0);

    const citiesWithoutEmail = ["London", "Paris"];

    const emailRequired =
      distance > 30 || !citiesWithoutEmail.includes(destination) || price < 50;

    if (emailRequired) {
      res.status(200).json({ email_required: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { pricingController };
