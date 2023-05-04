const knex = require('../libraries/Postgres')
const crypto = require('crypto')


const getAllTypesOfGendersFromDb = () => {    
    return knex("genders")
            .select("*");
}

const addTypeToGendersDb = (type, imgUrl) => {
    return knex("genders")
            .insert({
                id : crypto.randomUUID(),
                type,
                imgurl: imgUrl
            })
}

const getGenderTypeById = (genderId) => {
    console.log(genderId)
    return knex("genders")
    .select("*")
    .where('id', genderId);
}

module.exports = {
    getAllTypesOfGendersFromDb, addTypeToGendersDb, getGenderTypeById
}