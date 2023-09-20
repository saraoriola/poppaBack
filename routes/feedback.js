const express = require("express");
const FeedbackController = require("../controllers/FeedbackController");
const router = express.Router();

router.get("/getbyid/:id", FeedbackController.getFeedBackById);
router.get("/getall", FeedbackController.getAllFeedBack);
router.get("/highertolower",FeedbackController.getInDesc)
router.get("/lowertohigher",FeedbackController.getInAsc)

router.post("/create", FeedbackController.createFeedBack);
router.post("/valoration", FeedbackController.createValoration);

router.put("/update/:id", FeedbackController.updateFeedBack);
router.put("/update/valoration/:id", FeedbackController.updateValoration);

router.delete("/delete/valoration/:id", FeedbackController.deleteValoration);
router.delete("/delete/:id", FeedbackController.deleteFeedBackById);
router.delete("/deleteall", FeedbackController.deleteAllFeedbacks);

module.exports = router;