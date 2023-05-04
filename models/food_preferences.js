const knex = require("../libraries/Postgres")
const crypto = require("crypto")

const getAllFoodPreferencesFromDb = () => {
    return knex("food_preferences_type")
            .select("*")
}

const getFoodPreferencetypeByIdFromDb = (foodPrefId) => {
    return knex("food_preferences_type")
            .select('*')
            .where('id', foodPrefId)
}

const insertFoodPreferenceTypeInDb = async(type, mainImgUrl, logoImgUrl) => {
    return await knex("food_preferences_type")
            .insert({
                "id": crypto.randomUUID(), 
                "type": type,
                "mainImgUrl": mainImgUrl,
                "logoImgUrl": logoImgUrl
            })
}


module.exports = {
    getAllFoodPreferencesFromDb, getFoodPreferencetypeByIdFromDb, insertFoodPreferenceTypeInDb
}