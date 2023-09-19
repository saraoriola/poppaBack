const express = require("express");

const router = express.Router();
const OrganizationController = require("../controllers/OrganizationController");

router.post("/create", OrganizationController.createOrganization);

router.put("/update/:id", OrganizationController.updateOrganization);

module.exports = router;
