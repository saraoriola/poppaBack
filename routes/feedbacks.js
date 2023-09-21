const express = require("express");
const FeedbackController = require("../controllers/FeedbackController");
const { authentication, isAdmin } = require("../middleware/authentication");
const router = express.Router();

router.get("/getbyid/:id", authentication, FeedbackController.getFeedBackById);
router.get("/getall", authentication, FeedbackController.getAllFeedBack);
router.get("/highertolower", authentication, FeedbackController.getInDesc);
router.get("/lowertohigher", authentication, FeedbackController.getInAsc);

router.post("/create", authentication, FeedbackController.createFeedBack);
router.post("/valoration", authentication, FeedbackController.createValoration);

//NOTE: Hacer un endpoint para que el usuario pueda actualizar solo sus feedbacks.
router.put("/update/:id", authentication, FeedbackController.updateFeedBack); //NOTE: Estos los veo innecesarios, un admin para que querría actualizar los endpoints de un usuario?
router.put(
  "/update/valoration/:id",
  authentication,
  FeedbackController.updateValoration
);

//NOTE: Hacer un endpoint para que el usuario pueda borrar solo sus feedbacks.
router.delete(
  "/delete/valoration/:id",
  isAdmin,
  authentication,
  FeedbackController.deleteValoration
);
router.delete(
  "/delete/:id",
  isAdmin,
  authentication,
  FeedbackController.deleteFeedBackById
);
router.delete(
  "/deleteall",
  isAdmin,
  authentication,
  FeedbackController.deleteAllFeedbacks
);

module.exports = router;
