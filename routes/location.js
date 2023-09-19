const express = require("express");
const LocationController = require("../controllers/LocationController");
const router = express.Router();

//const { authentication } = require("../middleware/authentication");
//const { uploadUserImages } = require("../middleware/multer");

router.get("/getbyid/:id", LocationController.getById);
router.get("/capacity/:capacity",LocationController.getByCapacity)
router.get("/highertolower",LocationController.getInDesc)
router.get("/lowertohigher",LocationController.getInAsc)

router.post("/create",LocationController.createLocation);

router.put("/id/:id",LocationController.update)

router.delete("/delete/:id", LocationController.delete)



module.exports = router;