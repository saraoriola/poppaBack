const express = require("express");
const LocationController = require("../controllers/LocationController");
const router = express.Router();

//NOTE: const { authentication } = require("../middleware/authentication");
//NOTE: const { uploadUserImages } = require("../middleware/multer");

router.get("/getlocationsdesc", LocationController.getLocationsDesc);
router.get("/getlocationsasc", LocationController.getLocationsAsc);
router.get("/getbyid/:id", LocationController.getById);
router.get("/getbycapacity/:capacity", LocationController.getByCapacity);

router.post("/create", LocationController.createLocation);

router.put("/update/:id", LocationController.updateLocation);

router.delete("/delete/:id", LocationController.deleteLocation);

module.exports = router;
