const express = require("express");
const FacilityController = require("../controllers/FacilityController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.post("/create", authentication, FacilityController.createFacility);

module.exports = router;
