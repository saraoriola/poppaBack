const express = require("express");

const router = express.Router();

const EventController = require("../controllers/EventController");
const { authentication } = require("../middleware/authentication");

router.get("/getall", authentication, EventController.getAllEvents);
router.get("/getbyid/:id", authentication, EventController.getEventById);

router.post("/create", authentication, EventController.create);

router.put("/update/:id", authentication, EventController.updateEvent);

router.delete("/delete/:id", authentication, EventController.deleteEvent);

module.exports = router;
