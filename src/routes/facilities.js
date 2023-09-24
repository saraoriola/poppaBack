const express = require("express");
const FacilityController = require("../controllers/FacilityController");
const router = express.Router();
const { authentication, isAdmin } = require("../middleware/authentication");

router.get("/getall", authentication, FacilityController.getAllFacilities);
router.get("/getbyid/:id", authentication, FacilityController.getFacilityById);
router.get(
  "/getbyname/:name",
  authentication,
  FacilityController.getFacilitiesByName
);
router.get(
  "/getbyaddress/:address",
  authentication,
  FacilityController.getFacilitiesByAddress
);

router.post(
  "/create",
  isAdmin,
  authentication,
  FacilityController.createFacility
);

router.put(
  "/update",
  isAdmin,
  authentication,
  FacilityController.updateFacility
);

router.delete(
  "/delete/:id",
  isAdmin,
  authentication,
  FacilityController.deleteFacility
);

module.exports = router;
