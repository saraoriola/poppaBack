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

router.put("/update/:id", authentication, EventUserController.updateEventUser);

router.delete("/delete/:id", authentication, EventUserController.deleteEventUser);

module.exports = router;
