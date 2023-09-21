const express = require("express");
const EducationalCenterController = require("../controllers/EducationalCenterController");
const { isAdmin, authentication } = require("../middleware/authentication");
const router = express.Router();

router.post(
  "/create",
  isAdmin,
  authentication,
  EducationalCenterController.create
);

module.exports = router;
