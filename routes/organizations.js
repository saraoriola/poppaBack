const express = require("express");
const OrganizationController = require("../controllers/OrganizationController");

const router = express.Router();

router.post("/createOrganization", OrganizationController.createOrganization );

module.exports = router;
