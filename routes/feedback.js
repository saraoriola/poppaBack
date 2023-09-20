const express = require("express");
const FeedbackController = require("../controllers/FeedbackController");
const router = express.Router();

router.get("/getbyid/:id", FeedbackController.getFeedBackById);
router.get("/getall", FeedbackController.getAllFeedBack);


router.post("/create", FeedbackController.createFeedBack);

router.put("/update/:id", FeedbackController.updateFeedBack);

router.delete("/delete/:id", FeedbackController.deleteFeedBack);

module.exports = router;