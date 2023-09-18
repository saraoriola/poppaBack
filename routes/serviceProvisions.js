const express = require("express");
const ServiceProvisionController = require("../controllers/ServiceProvisionController");
const { authentication } = require("../middleware/authentication");
const router = express.Router();

router.get(
  "/getall",
  authentication,
  ServiceProvisionController.getAllServices
);
router.get(
  "/getbyid",
  authentication,
  ServiceProvisionController.getServiceById
);
router.get(
  "/getbyname",
  authentication,
  ServiceProvisionController.getServiceByName
);

router.post(
  "/create",
  authentication,
  ServiceProvisionController.createService
);

router.put("/update", authentication, ServiceProvisionController.updateService);

router.delete(
  "/delete",
  authentication,
  ServiceProvisionController.deleteService
);

module.exports = router;
