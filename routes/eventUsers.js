const express = require("express");
const EventUserController = require("../controllers/EventUserController");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

router.get("/getall", authentication, EventUserController.getAllEventUsers);
router.get(
  "/getbyeventid/:id",
  authentication,
  EventUserController.getAllEventUsersByEvent
);

router.post("/create", authentication, EventUserController.createEventUser);

module.exports = router;
