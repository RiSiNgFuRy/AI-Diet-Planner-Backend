const foodPreferencesQuery = require('../models/food_preferences')

const getAllFoodPrefernceTypeDetails = async(req, res) => {
   
    await foodPreferencesQuery.getAllFoodPreferencesFromDb()
        .then(data => {
            return res.json({
                data
            })
        }).catch(err => {
            console.log(err)
            return res.status(401).json({
                message: "Some error occurred"
            })
        })
}

const setFoodPreferenceDetails = async (req, res) => {
    const {type, mainImgUrl, logoImgUrl} = req.body
    await foodPreferencesQuery.insertFoodPreferenceTypeInDb(
        type,
        mainImgUrl,
        logoImgUrl
    ).catch(err => {
        console.log(err)
        return res.status(401).json({
            message: "Some error occurred"
        })
    })

    return res.json({
        status: "Success"
    })
}

const getFoodPreferenceById = async(req, res) => {
    const {id} = req.params
    await foodPreferencesQuery.getFoodPreferencetypeByIdFromDb(id)
    .then(data => {
        return res.json({
            data
        })
    }).catch(err => {
        console.log(err)
        return res.status(401).json({
            message: "Some error occurred"
        })
    })
} 

module.exports = {
    getAllFoodPrefernceTypeDetails, setFoodPreferenceDetails, getFoodPreferenceById
}