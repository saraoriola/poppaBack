const express = require("express");
const RoleController = require("../controllers/RoleController");
const router = express.Router();
const { isAdmin, authentication } = require("../middleware/authentication");

router.put(
  "/updatetoadmin/:id",
  isAdmin,
  authentication,
  RoleController.updateToAdmin
);

module.exports = router;
