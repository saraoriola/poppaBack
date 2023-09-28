const express = require("express");
const router = express.Router();
const EventUserController = require("../controllers/EventUserController");
const { authentication } = require("../middleware/authentication");

router.get("/getall", authentication, EventUserController.getAllEventUsers);
router.get("/getbyeventid/:id", authentication, EventUserController.getAllEventUsersByEvent);
router.get("/:event_id/qr", authentication, EventUserController.getQrCodeByEventUser);

router.post("/userCheckIn", EventUserController.userCheckIn); 
router.post("/userCheckOut", EventUserController.userCheckOut); 
router.post("/create", authentication, EventUserController.createEventUser);

router.put("/update/:id", authentication, EventUserController.updateEventUser);

router.delete("/delete/:id", authentication, EventUserController.deleteEventUser);

module.exports = router;
