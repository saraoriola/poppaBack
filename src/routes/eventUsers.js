const express = require("express");
const router = express.Router();
const EventUserController = require("../controllers/EventUserController");
const { authentication } = require("../middleware/authentication");

router.get("/getall", authentication, EventUserController.getAllEventUsers);
router.get("/getbyeventid/:id", authentication, EventUserController.getAllEventUsersByEvent);
router.get("/qr", authentication, EventUserController.getQrCodeByEventUser);

// No se si algo de sto debe ser admin
router.post("/userCheckIn", EventUserController.userCheckIn); // Agregar middleware de auth y admin
router.post("/userCheckOut", EventUserController.userCheckOut); // Agregar middleware de auth y admin
router.post("/create", authentication, EventUserController.createEventUser);
router.put("/update/:id", authentication, EventUserController.updateEventUser);
router.delete("/delete/:id", authentication, EventUserController.deleteEventUser);

module.exports = router;
