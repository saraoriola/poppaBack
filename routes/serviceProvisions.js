const express = require("express");
const ServiceProvisionController = require("../controllers/ServiceProvisionController");
const { authentication } = require("../middleware/authentication");
const router = express.Router();

router.post("/create", authentication, ServiceProvisionController.createService);

module.exports = router;
