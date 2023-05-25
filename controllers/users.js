const usersQuery = require('../models/users');
const {isEmpty} = require('../helpers/Validation');
const foodPreferencesQuery = require('../models/food_preferences')
const goalTypeQuery = require('../models/goalType')
const genderTypeQuery = require('../models/genderType')

const getUsersDietChart = async(req, res) => {
    const {userId} = req.params
    const {type} = req.query
    await usersQuery.getUserDietChartFromDb(userId)
        .then(async(data) => {
            if(data[0].dietChart == null || type == "new"){
                let settingsData = (await usersQuery.getUserSettingsFromDb(userId))[0]

                if(isEmpty(settingsData.age)){
                    return res.status(401).json({
                        error: "Age cannot be null"
                    })
                }else if(isEmpty(settingsData.weight_kg)){
                    return res.status(401).json({
                        error: "Weight cannot be null"
                    })
                }else if(isEmpty(settingsData.height_cm)){
                    return res.status(401).json({
                        error: "Height cannot be null"
                    })
                }

                let foodPreference = await foodPreferencesQuery.getFoodPreferencetypeByIdFromDb(settingsData.foodPreferenceType)
                    .catch(err => {
                        console.log(err)
                        return res.status(401).json({
                            message: "Unable to get food preference details"
                        })
                    })

                let goalValue = await goalTypeQuery.getGoalTypeByIdFromDb(settingsData.goal)
                    .catch(err => {
                        console.log(err)
                        return res.status(401).json({
                            message: "Unable to get goal details"
                        })
                    })

                let gender = await genderTypeQuery.getGenderTypeById(settingsData.genderType)
                .catch(err => {
                    console.log(err)
                    return res.status(401).json({
                        message: "Unable to get gender details"
                    })
                })

                return res.json(JSON.parse(await generateUsersDietChart(userId, settingsData.age, foodPreference[0], settingsData.weight_kg, settingsData.height_cm, goalValue[0], gender[0])))
            }
            else
                return res.json(data[0].dietChart)
        }).catch(err => {
            console.log(err)
            return res.status(401).json({
                message: "Some error occurred"
            })
        })   
}

const generateUsersDietChart = async(userId, age, foodPreference, weight, height, goalValue, gender) => {

    let data =  await usersQuery.generateUserDietChartFromAi(age, foodPreference.type, weight, height, goalValue.type, gender.type)
    console.log(age +" "+ foodPreference.type +" "+ weight +" "+ height +" "+ goalValue.type +" "+ gender.type)
    console.log("data: "+data)
    await usersQuery.setUserDietChartInDb(userId, data)
    return data
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