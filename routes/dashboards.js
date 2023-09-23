const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/DashboardController");
const { authentication, isAdmin } = require("../middleware/authentication");

router.get("/event/:id", DashboardController.getEventById);
router.get("/user/:id", DashboardController.getUserById);
router.get("/event/:id/arrival-departure", DashboardController.getArrivalAndDepartureTimeForEvent);
router.get('/event/:id/attendees-count', DashboardController.countAttendeesForEvent);
router.get("/event/:id/speacker", DashboardController.getSpeackerName);
router.get("/event/:id/location", DashboardController.getLocationDescription);
router.get("/event/:id/confirmed-count", DashboardController.countConfirmedAttendeesForEvent);
router.get('/event/:id/interested-count', DashboardController.countInterested);


module.exports = router;
