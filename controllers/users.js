const usersQuery = require('../models/users');
const {isEmpty} = require('../helpers/Validation');
const foodPreferencesQuery = require('../models/food_preferences')
const goalTypeQuery = require('../models/goalType')
const genderTypeQuery = require('../models/genderType')

const getUsersDietChart = async(req, res) => {
    const {userId} = req.params
    await usersQuery.getUserDietChartFromDb(userId)
        .then(data => {
            if(data[0].dietChart == null)
                generateUsersDietChart(userId)
            return res.json(data[0].dietChart)
        }).catch(err => {
            console.log(err)
            return res.status(401).json({
                message: "Some error occurred"
            })
        })   
}

const generateUsersDietChart = async(userId) => {
    let {height_cm, weight_kg, genderType, age, goal, foodPreferenceType} = await usersQuery.getUserSettingsFromDb(userId)
    if(isEmpty(age)){
        return res.status(401).json({
            error: "Age cannot left be null"
        })
    }else if(isEmpty(weight_kg)){
        return res.status(401).json({
            error: "Weight cannot left be null"
        })
    }else if(isEmpty(height_cm)){
        return res.status(401).json({
            error: "Height cannot left be null"
        })
    }

    let foodPreference = await foodPreferencesQuery.getFoodPreferencetypeByIdFromDb(foodPreferenceType)
        .catch(err => {
            console.log(err)
            return res.status(401).json({
                message: "Unable to get food preference details"
            })
        })

    let goalValue = await goalTypeQuery.getGoalTypeByIdFromDb(goal)
        .catch(err => {
            console.log(err)
            return res.status(401).json({
                message: "Unable to get goal details"
            })
        })

    let gender = await genderTypeQuery.getGenderTypeById(genderType)
    .catch(err => {
        console.log(err)
        return res.status(401).json({
            message: "Unable to get gender details"
        })
    })

    await usersQuery.generateUserDietChartFromAi(age, foodPreference.type, weight, height, goalValue.type, gender.type)
        .then(data => {
            return res.json(data)
        }).catch(err => {
            console.log(err)
            return res.status(401).json({
                message: "Some error occurred while generating diet chart from AI"
            })
        }) 
}

const setUserHeightAndWeight = async(req, res) => {
    const {userId} = req.params
    const {height, weight} = req.body
    await usersQuery.setUserHeightAndWeightInDb(userId, height, weight)
    .catch(err => {
        console.log(err)
        return res.status(401).json({
            message: "Some error occurred"
        })
    })   

    return res.json({
        height,
        weight
    })
}

const setUserGender = async(req, res) => {
    const {userId} = req.params
    const {genderId} = req.query
    await usersQuery.setUserGenderTypeInDb(userId, genderId)
    .catch(err => {
        console.log(err)
        return res.status(401).json({
            message: "Some error occurred"
        })
    })   

    return res.json({
        id: genderId
    })
}

const setUserAge = async(req, res) => {
    const {userId} = req.params
    const {age} = req.query
    await usersQuery.setUserAgeInDb(userId, age)
    .catch(err => {
        console.log(err)
        return res.status(401).json({
            message: "Some error occurred"
        })
    })   

    return res.json({
        age
    })
}

const setUserGoal = async(req, res) => {
    const {userId} = req.params
    const {goalId} = req.query
    await usersQuery.setUserGoalInDb(userId, goalId)
    .catch(err => {
        console.log(err)
        return res.status(401).json({
            message: "Some error occurred"
        })
    })   

    return res.json({
        id: goalId
    })
}

const setUserFoodPreference = async(req, res) => {
    const {userId} = req.params
    const {foodPreferenceId} = req.query
    await usersQuery.setUserFoodPreferenceInDb(userId, foodPreferenceId)
    .catch(err => {
        console.log(err)
        return res.status(401).json({
            message: "Some error occurred"
        })
    })   

    return res.json({
        id: foodPreferenceId
    })
}

const getUserSettingDetails = async(req, res) => {
    const {userId} = req.params
    await usersQuery.getUserSettingsFromDb(userId)
    .then(data => {
        return res.json(data)
    }).catch(err => {
        console.log(err)
        return res.status(401).json({
            message: "Some error occurred"
        })
    })
}

module.exports = {
    getUsersDietChart, setUserHeightAndWeight, setUserGender,
    setUserAge, setUserGoal, setUserFoodPreference,
    getUserSettingDetails, generateUsersDietChart
}