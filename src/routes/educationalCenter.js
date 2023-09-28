const express = require("express");
const EducationalCenterController = require("../controllers/EducationalCenterController");
const { isAdmin, authentication } = require("../middleware/authentication");
const router = express.Router();

router.get("/getbyid/:id", authentication, EducationalCenterController.getById);
router.get("/getall",authentication,EducationalCenterController.getAllEducationalCenter);

router.post("/create",isAdmin,authentication,EducationalCenterController.create);

router.put("/update/:id",isAdmin,authentication,EducationalCenterController.updateEducationalCenter);

router.delete("/delete/:id",isAdmin,authentication,EducationalCenterController.deleteEducationalCenter);

module.exports = router;
