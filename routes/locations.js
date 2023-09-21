const express = require("express");
const LocationController = require("../controllers/LocationController");
const router = express.Router();
const { authentication, isAdmin } = require("../middleware/authentication");

//NOTE: const { uploadUserImages } = require("../middleware/multer");

router.get(
  "/getlocationsdesc",
  authentication,
  LocationController.getLocationsDesc
);
router.get(
  "/getlocationsasc",
  authentication,
  LocationController.getLocationsAsc
);
router.get("/getbyid/:id", authentication, LocationController.getById);
router.get(
  "/getbycapacity/:capacity",
  authentication,
  LocationController.getByCapacity
);

router.post(
  "/create",
  isAdmin,
  authentication,
  LocationController.createLocation
);

router.put(
  "/update/:id",
  isAdmin,
  authentication,
  LocationController.updateLocation
);

router.delete(
  "/delete/:id",
  isAdmin,
  authentication,
  LocationController.deleteLocation
);

module.exports = router;
