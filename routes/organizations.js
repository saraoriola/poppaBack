const express = require("express");

const router = express.Router();
const OrganizationController = require("../controllers/OrganizationController");

router.post("/createOrganization", OrganizationController.createOrganization);

module.exports = router;
