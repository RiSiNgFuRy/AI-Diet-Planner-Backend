const knex = require('../libraries/Postgres')
const crypto = require('crypto')

const getAllGoalTypesFromDb = () => {
    return knex('goaltype')
    .select('*')
}

const insertGoalTypeInDb = (type) => {
    return knex('goaltype')
    .insert({
        id: crypto.randomUUID(),
        type
    })
}

const getGoalTypeByIdFromDb = (id) => {
    return knex('goaltype')
    .select('*')
    .where('id', id)
}

module.exports = {
    getAllGoalTypesFromDb, insertGoalTypeInDb, getGoalTypeByIdFromDb
}