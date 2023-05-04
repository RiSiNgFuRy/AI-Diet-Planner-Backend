const knex = require('../libraries/Postgres')
const crypto = require('crypto');

async function hash(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}

const registerUserInDb = async (email,username,password) => {
    const hpass = await hash(password);
    return knex('users').insert({
        userid: crypto.randomUUID(),
        email: email,
        username: username,
        password: hpass
    });
}
 
const verifyUserInDb = (email,password) => {

    return knex('users').select('*').where('email', email)
                .then((data) => {
                    if(verify(password, data[0].password.toString()))
                        return data;
                })
                .catch((err) => console.log(err));
}

const getUserDietChartFromDb = (userId) => {
    return knex('users')
        .select('dietChart')
        .where('userid', userId)
}

const getUserSettingsFromDb = (userId) => {
    return knex('users')
    .where('userid', userId)
    .select(
        "height(cm)",
        "weight(kg)",
        "genderType",
        "age",
        "goal",
        "foodPreferenceType"
        )
}

const setUserHeightAndWeightInDb = (userId, height, weight) => {
    return knex('users')
    .where('userid', userId)
    .update({
        "height_cm": height,
        "weight_kg": weight
    })
}

const setUserGenderTypeInDb = (userId, genderId) => {
    return knex('users')    
    .where('userid', userId)
    .update({
        "genderType": genderId
    })
}

const setUserAgeInDb = (userId, age) => {
    return knex('users')    
    .where('userid', userId)
    .update({
        "age": age
    })
}

const setUserGoalInDb = (userId, goalId) => {
    return knex('users')    
    .where('userid', userId)
    .update({
        "goal": goalId
    })
}

const setUserFoodPreferenceInDb = (userId, foodPreferenceId) => {
    console.log(foodPreferenceId)
    return knex('users')    
    .where('userid', userId)
    .update({
        "foodPreferenceType": foodPreferenceId
    })
}

module.exports = {
    registerUserInDb, verifyUserInDb, getUserDietChartFromDb,
    getUserSettingsFromDb, setUserGenderTypeInDb,
    setUserAgeInDb, setUserGoalInDb,
    setUserHeightAndWeightInDb, setUserFoodPreferenceInDb
}; 