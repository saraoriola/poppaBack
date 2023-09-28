const express = require("express");
const FeedBacksController = require("../controllers/FeedBacksController");
const { authentication, isAdmin } = require("../middleware/authentication");
const router = express.Router();

router.get("/getbyid/:id", authentication, FeedBacksController.getFeedBackById);
router.get("/getall", authentication, FeedBacksController.getAllFeedBack);
router.get("/highertolower", authentication, FeedBacksController.getInDesc);
router.get("/lowertohigher", authentication, FeedBacksController.getInAsc);

router.post("/create", authentication, FeedBacksController.createFeedBack);
router.post("/valoration", authentication, FeedBacksController.createValoration);


router.put("/update/:id", authentication, FeedBacksController.updateFeedBack); 
router.put("/update/valoration/:id", authentication, FeedBacksController.updateValoration);


router.delete("/delete/valoration/:id", isAdmin, authentication, FeedBacksController.deleteValoration);
router.delete("/delete/:id", isAdmin, authentication, FeedBacksController.deleteFeedBackById);
router.delete("/deleteall", isAdmin, authentication, FeedBacksController.deleteAllFeedbacks);

module.exports = router;
