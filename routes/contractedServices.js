const express = require("express");
const contractedServices = require("../controllers/ContractedServiceController");
const { authentication } = require("../middleware/authentication");
const router = express.Router();

router.get(
  "/getall",
  authentication,
  contractedServices.getAllContractedServices
);
router.get(
  "/getbyid",
  authentication,
  contractedServices.getContractedServiceById
);

router.post(
  "/create",
  authentication,
  contractedServices.createContractedService
);

router.put(
  "/update",
  authentication,
  contractedServices.updateContractedService
);

router.delete(
  "/delete",
  authentication,
  contractedServices.deleteContractedService
);
