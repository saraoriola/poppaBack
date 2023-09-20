const express = require("express");
const EventUserController = require("../controllers/EventUserController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.post("/create", authentication, EventUserController.createEventUser);

module.exports = router;
