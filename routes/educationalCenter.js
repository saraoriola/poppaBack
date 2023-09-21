const express = require("express");
const EducationalCenterController = require("../controllers/EducationalCenterController");
const router = express.Router();


router.get("/getbyid/:id", EducationalCenterController.getById)
router.get("/getall", EducationalCenterController.getAllEducationalCenter)

router.post("/create", EducationalCenterController.create);

router.put("/update/:id", EducationalCenterController.updateEducationalCenter);

router.delete("/delete/:id", EducationalCenterController.deleteEducationalCenter);


module.exports = router;