const express = require("express");
const router = express.Router();
const genderTypeController = require("../controllers/genderType");

router
.route("/genderType")
.get(genderTypeController.getAllGenderTypes)
.post(genderTypeController.addToGenderDb)

router.get("/genderType/:id", genderTypeController.getGenderTypeById)

module.exports = router;
