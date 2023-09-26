const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/DashboardController");
const { authentication, isAdmin } = require("../middleware/authentication");

router.get("/event/:id", DashboardController.getEventById);

module.exports = router;
