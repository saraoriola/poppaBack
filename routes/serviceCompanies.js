const express = require("express");

const router = express.Router();

const ServiceCompanyController = require("../controllers/ServiceCompanyController");
const { authentication } = require("../middleware/authentication");

router.get(
  "/getall",
  authentication,
  ServiceCompanyController.getAllServiceCompanies
);
router.get(
  "/getbyid/:id",
  authentication,
  ServiceCompanyController.getServiceCompanyById
);
router.get(
  "/getbyname/:name",
  authentication,
  ServiceCompanyController.getAllServiceCompaniesByName
);

router.post(
  "/create",
  authentication,
  ServiceCompanyController.createServiceCompany
);

router.put(
  "/update/:id",
  authentication,
  ServiceCompanyController.updateServiceCompany
);

router.delete(
  "/delete/:id",
  authentication,
  ServiceCompanyController.deleteServiceCompany
);

module.exports = router;
