const express = require("express");
const router = express.Router();
const OrganizationController = require("../controllers/OrganizationController");

router.post("/createOrganization", OrganizationController.createOrganization);
router.put("/updateOrganization/:id", OrganizationController.updateOrganization);

module.exports = router;
