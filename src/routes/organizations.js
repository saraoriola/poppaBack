const express = require("express");
const router = express.Router();
const OrganizationController = require("../controllers/OrganizationController");
const { authentication, isAdmin } = require("../middleware/authentication");

router.get("/getall", authentication, OrganizationController.getAll);
router.get("/getallsortbysector/:sector",authentication,OrganizationController.getAllSortBySector);
router.get("/getbyid/:id", authentication, OrganizationController.getById);
router.get("/getbyname/:name",authentication,OrganizationController.getOrganizationByName);
router.get("/getbysector/:sector",authentication,OrganizationController.getOrganizationBySector);

router.post("/create",isAdmin,authentication,OrganizationController.createOrganization);

router.put("/update/:id",isAdmin,authentication,OrganizationController.updateOrganization);

router.delete("/delete/:id",isAdmin,authentication,OrganizationController.deleteOrganization);

module.exports = router;
