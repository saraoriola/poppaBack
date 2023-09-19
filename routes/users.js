const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication } = require("../middleware/authentication");
const { uploadUserImages } = require("../middleware/multer");
const router = express.Router();

router.get("/getall", UserController.getAll);
router.get("/getbyid/:id", UserController.getById);
router.get("/name/:name", UserController.getUserByName);
router.get("/confirm/:emailToken", UserController.confirm);
router.get("/recoverPassword/:email", UserController.recoverPassword);

router.post(
  "/register",
  uploadUserImages.single("avatar"),
  UserController.register
);
router.post("/login", UserController.login);

router.put("/id/:id", UserController.update);
router.put("/resetPassword/:recoverToken", UserController.resetPassword);

router.delete("/logout", authentication, UserController.logout);
router.delete("/delete/:id", UserController.delete);

module.exports = router;
