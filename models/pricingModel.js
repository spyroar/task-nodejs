const mongoose = require("mongoose");

// Define the Pricing Schema
const pricingSchema = new mongoose.Schema({
  country: String,
  city: {
    type:String,
   enum:["Berlin", "London", "Paris", "Barcelona", "Amsterdam"]
  },
  vehicleType: String,
  airportFees: Number,    
  amountPerHour: Number,
  amountPerKm: Number,
  baseAmount: Number,
  baseKm: Number,
});

// Define Pricing Module
 const Pricing = mongoose.model("Pricing", pricingSchema);

 module.exports={Pricing}

