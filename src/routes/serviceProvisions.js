const express = require("express");

const router = express.Router();

const ServiceProvisionController = require("../controllers/ServiceProvisionController");
const { authentication, isAdmin } = require("../middleware/authentication");

// NOTE: Esto lo pongo todo en admin ya que al user normal le da igual
router.get(
  "/getall",
  isAdmin,
  authentication,
  ServiceProvisionController.getAllServices
);
router.get(
  "/getbyid/:id",
  isAdmin,
  authentication,
  ServiceProvisionController.getServiceById
);
router.get(
  "/getbyname/:name",
  isAdmin,
  authentication,
  ServiceProvisionController.getServiceByName
);

router.post(
  "/create",
  isAdmin,
  authentication,
  ServiceProvisionController.createService
);

router.put(
  "/update/:id",
  isAdmin,
  authentication,
  ServiceProvisionController.updateService
);

router.delete(
  "/delete/:id",
  isAdmin,
  authentication,
  ServiceProvisionController.deleteService
);

module.exports = router;
