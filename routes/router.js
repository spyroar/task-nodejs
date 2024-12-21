const express=require('express');
const { pricingController } = require('../controllers/pricingController');
const  router = express.Router();
   // API endpoint to determine if email is required
router.post("/api/pricing",pricingController);
module.exports=router