const express = require("express");

const router = express.Router();
const OrganizationController = require("../controllers/OrganizationController");

router.get("/getall", OrganizationController.getAll);
router.get(
  "/getallsortbysector/:sector",
  OrganizationController.getAllSortBySector
);
router.get("/getbyid/:id", OrganizationController.getById);
router.get("/getbyname/:name", OrganizationController.getOrganizationByName);
router.get(
  "/getbysector/:sector",
  OrganizationController.getOrganizationBySector
);

router.post("/create", OrganizationController.createOrganization);

router.put("/update/:id", OrganizationController.updateOrganization);

router.delete("/delete/:id", OrganizationController.deleteOrganization);

module.exports = router;
