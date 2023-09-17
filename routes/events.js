const express = require("express");

const router = express.Router();

const EventController = require("../controllers/EventController");
const { authentication } = require("../middleware/authentication");

router.post("/", authentication, EventController.create);

module.exports = router;
