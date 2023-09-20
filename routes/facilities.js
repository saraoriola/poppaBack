const express = require("express");
const FacilityController = require("../controllers/FacilityController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.get("/getall", FacilityController.getAllFacilities);
router.get("/getbyid/:id", FacilityController.getFacilityById);
router.get("/getbyname/:name", FacilityController.getFacilitiesByName);
router.get("/getbyaddress/:address", FacilityController.getFacilitiesByAddress);

router.post("/create", authentication, FacilityController.createFacility);

module.exports = router;
