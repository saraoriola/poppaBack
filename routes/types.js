const express = require("express");
const TypeController = require("../controllers/TypeController");

const router = express.Router();

router.get("/getbyname/:name", TypeController.getTypeByName);
router.get("/getall", TypeController.getAll);
router.get("/getbyid/:id", TypeController.getById);

router.post("/create", TypeController.create);

router.put("/update/:id", TypeController.updateType);

router.delete("/delete/:id", TypeController.deleteTypeById)


module.exports = router;