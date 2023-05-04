const goalTypeQuery = require('../models/goalType')

const getAllGoalTypes = async(req, res) => {
    await goalTypeQuery.getAllGoalTypesFromDb()
    .then(data => {
        return res.json(
            data
        )
    })
    .catch((err) => {
        console.log(err)
        return res.status(401).json({
            meassage: "Some error occurred"
        })
    })
}

const getGoalTypeById = async(req, res) => {
    const {id} = req.params
    await goalTypeQuery.getGoalTypeByIdFromDb(id)
    .then(data => {
        return res.json(
            data
        )
    })
    .catch((err) => {
        console.log(err)
        return res.status(401).json({
            meassage: "Some error occurred"
        })
    })
}

const insertGoalType = async(req, res) => {
    const {type} = req.body
    await goalTypeQuery.insertGoalTypeInDb(type)
    .catch((err) => {
        console.log(err)
        return res.status(401).json({
            meassage: "Some error occurred"
        })
    })

    return res.json({
        status: "Success"
    })
}

module.exports = {
    getAllGoalTypes,
    getGoalTypeById,
    insertGoalType
}

