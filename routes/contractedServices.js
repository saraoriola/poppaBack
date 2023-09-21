const express = require("express");
const contractedServices = require("../controllers/ContractedServiceController");
const { authentication, isAdmin } = require("../middleware/authentication");
const router = express.Router();

// NOTE: Los pongo todos admin ya que esto es información que no le interesa a un usuario normal.
router.get(
  "/getall",
  isAdmin,
  authentication,
  contractedServices.getAllContractedServices
);
router.get(
  "/getbyid/:id",
  isAdmin,
  authentication,
  contractedServices.getContractedServiceById
);

router.post(
  "/create",
  isAdmin,
  authentication,
  contractedServices.createContractedService
);

router.put(
  "/update/:id",
  isAdmin,
  authentication,
  contractedServices.updateContractedService
);

router.delete(
  "/delete/:id",
  isAdmin,
  authentication,
  contractedServices.deleteContractedService
);

module.exports = router;
