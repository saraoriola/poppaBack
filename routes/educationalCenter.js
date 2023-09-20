const express = require("express");
const EducationalCenterController = require("../controllers/EducationalCenterController");
const router = express.Router();


router.post("/create", EducationalCenterController.create);


module.exports = router;