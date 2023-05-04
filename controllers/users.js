const usersQuery = require('../models/users');

const getUsersDietChart = async(req, res) => {
    const {userId} = req.params
    await usersQuery.getUserDietChartFromDb(userId)
        .then(data => {
            return res.json(data[0])
        }).catch(err => {
            console.log(err)
            return res.status(401).json({
                message: "Some error occurred"
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
        return res.status(401).json({
            message: "Some error occurred"
        })
    })
}

module.exports = {
    getUsersDietChart, setUserHeightAndWeight, setUserGender,
    setUserAge, setUserGoal, setUserFoodPreference,
    getUserSettingDetails
}