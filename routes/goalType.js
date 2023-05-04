const express = require("express");
const router = express.Router();
const goalTypeController = require("../controllers/goalType");

router
.route("/goalType")
.get(goalTypeController.getAllGoalTypes)
.post(goalTypeController.insertGoalType)

router.get("/goalType/:id", goalTypeController.getGoalTypeById)

module.exports = router;
