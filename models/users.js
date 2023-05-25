const knex = require('../libraries/Postgres')
const crypto = require('crypto');
const { PythonShell } = require("python-shell")

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

const setUserDietChartInDb = (userId, jsonData) => {
    return knex("users")
        .where("userid", userId)
        .update({
            "dietChart": JSON.parse(jsonData)
        })
}

const generateUserDietChartFromAi = async(age, foodPreference, weight, height, goal, gender) => {
    let options = {
        mode: "text",
        scriptPath: "C:/Users/hp/Desktop/diet-planner",
        args: [age, foodPreference, weight, height, goal, gender]
    }

    let dietChartObj = await PythonShell.run("test.py", options)
    .catch(err => {
        console.log(err)
        throw err
    })

    // console.log(JSON.parse(dietChartObj[0]))
    return dietChartObj[0]
}

generateUserDietChartFromAi(22, "Veg", 84, 183, "Healthy", "Male")

const getUserSettingsFromDb = (userId) => {
    return knex('users')
    .where('userid', userId)
    .select(
        "height_cm",
        "weight_kg",
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
    setUserAgeInDb, setUserGoalInDb, setUserDietChartInDb,
    setUserHeightAndWeightInDb, setUserFoodPreferenceInDb,
    generateUserDietChartFromAi
}; 