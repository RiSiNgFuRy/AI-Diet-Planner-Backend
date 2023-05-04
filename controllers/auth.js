const {validateEmail, isEmpty} = require('../helpers/Validation');
const authQuery = require('../models/users');
const jwt = require("jsonwebtoken")

const registration = async (req,res) => {
    let {username, email, password} = req.body;

    if(isEmpty(username) || isEmpty(email) || isEmpty(password)) {
        return res.status(401).json({
            "message": 'Feilds cannot be left empty',
            username,
            email,
            password
        });
    }

    if(validateEmail(email)){
        return res.status(401).json({
            "message": 'Enter valid email address'
        })
    }

    await authQuery.registerUserInDb(email,username,password)
        .catch(err => {
            console.log(err)
            return res.status(401).json({
                "message": "Some error occured"
            })
        })
        
    return res.json({"status": "Success"})
}

const login = async (req,res) => {
    let {email, password} = req.body;
    let responseFromDb = 
    await authQuery.verifyUserInDb(email, password)
    .catch(err => {
        console.log(err)
        return res.status(401).json({
            message: "Some error occurred"
        })
    })
                        

    if(responseFromDb){
        let token = process.env.JWT_SECRET_KEY
        let data = {
            "time": Date(),
            "userId": responseFromDb[0].userid
        }
        return res.json({
            status: "Success",
            token: jwt.sign(data, token),
            userId: responseFromDb[0].userid,
            username: responseFromDb[0].username,
            email: responseFromDb[0].email,
            genderId: responseFromDb[0].genderType,
            foodPreferenceId: responseFromDb[0].foodPreferenceType,
            goalId: responseFromDb[0].goal,
            age: responseFromDb[0].age,
            height: responseFromDb[0].height_cm,
            weight: responseFromDb[0].weight_kg
        })
    }
    else{
        return res.status(401).send({
            status: "User not Found"
        })
    }
}

const token = async(req, res) => {
    const {token} = req.body
    if(token == null || isEmpty(token)){
        return res.status(401).json({
            message: "Token cannot be null"
        })
    }
    let verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if(verified)
        return res.json({status: "Success"})
    else
        return res.sendStatus(401)
}

module.exports = {
    registration, login, token
};