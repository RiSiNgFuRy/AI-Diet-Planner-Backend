const express = require("express")
const router = express.Router()
const foodPreferencesController = require("../controllers/food_preferences")


router
.route("/foodPreferences")
.get(foodPreferencesController.getAllFoodPrefernceTypeDetails)
.post(foodPreferencesController.setFoodPreferenceDetails)

router.get("/foodPreferences/:id", foodPreferencesController.getFoodPreferenceById)

module.exports = router;