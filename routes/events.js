const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventController");
const { authentication, isAdmin } = require("../middleware/authentication");
const { uploadUserImages } = require("../middleware/multer");

// NOTE: Los dejo libres para que cualquier usuario lo pueda ver
router.get("/getall", EventController.getAllEvents);
router.get("/getbyid/:id", EventController.getEventById);
// NOTE: Este lo dejo para que esté logeado
router.get(
  "/geteventwithrelations/:id",
  authentication,
  EventController.getEventWithRelations
);
router.get(
  "/geteventbylocationid/:id",

  EventController.getEventByLocationId
);
router.get("/getbytype/:type", EventController.getEventByType);
router.get(
  "/getbytitle/:title",

  EventController.getEventByTitle
);
router.get("/getbydateasc", EventController.getByDateAsc);
router.get("/getbydatedesc", EventController.getByDateDesc);
router.get(
  "/getbydurationasc",

  EventController.getByDurationAsc
);
router.get(
  "/getbydurationdesc",

  EventController.getByDurationDesc
);

router.post("/create", isAdmin, authentication, uploadUserImages.single("banner"), EventController.createEvent);

router.put("/update/:id", isAdmin, authentication, EventController.updateEvent);

router.delete(
  "/delete/:id",
  isAdmin,
  authentication,
  EventController.deleteEvent
);

module.exports = router;
