const express = require("express");
const router = express.Router();
const ServiceCompanyController = require("../controllers/ServiceCompanyController");
const { authentication, isAdmin } = require("../middleware/authentication");


router.get("/getall",isAdmin,authentication,ServiceCompanyController.getAllServiceCompanies);
router.get("/getbyid/:id",isAdmin,authentication,ServiceCompanyController.getServiceCompanyById);
router.get("/getbyname/:name",isAdmin,authentication,ServiceCompanyController.getAllServiceCompaniesByName);

router.post("/create",isAdmin,authentication,ServiceCompanyController.createServiceCompany);

router.put("/update/:id",isAdmin,authentication,ServiceCompanyController.updateServiceCompany);

router.delete("/delete/:id",isAdmin,authentication,ServiceCompanyController.deleteServiceCompany);

module.exports = router;
