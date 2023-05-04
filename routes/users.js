const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();


router.get("/user/:userId/dietChart", usersController.getUsersDietChart)
router.post("/user/:userId/bmiDetails", usersController.setUserHeightAndWeight)
router.post("/user/:userId/genderType", usersController.setUserGender)
router.post("/user/:userId/age", usersController.setUserAge)
router.post("/user/:userId/goalType", usersController.setUserGoal)
router.post("/user/:userId/foodPreferenceType", usersController.setUserFoodPreference)
router.get("/user/:userId/userSettings", usersController.getUserSettingDetails)

module.exports = router;