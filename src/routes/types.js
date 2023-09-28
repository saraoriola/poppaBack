const express = require("express");
const TypeController = require("../controllers/TypeController");
const { authentication, isAdmin } = require("../middleware/authentication");

const router = express.Router();

router.get("/getbyname/:name", authentication, TypeController.getTypeByName);
router.get("/getall", authentication, TypeController.getAll);
router.get("/getbyid/:id", authentication, TypeController.getById);

router.post("/create", isAdmin, authentication, TypeController.create);

router.put("/update/:id", isAdmin, authentication, TypeController.updateType);

router.delete("/delete/:id",isAdmin,authentication,TypeController.deleteTypeById
);

module.exports = router;
