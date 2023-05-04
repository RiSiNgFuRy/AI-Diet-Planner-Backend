const genderTypeQuery = require("../models/genderType");

const getAllGenderTypes = async (req, res) => {
  
  let data = await genderTypeQuery.getAllTypesOfGendersFromDb()
  .catch(err => {
    console.log(err)
    return res.status(401).json({
        message: "Some error occurred"
    })
  })

  return res.json({data})

};

const getGenderTypeById = async (req, res) => {
  const {id} = req.params

  await genderTypeQuery
  .getGenderTypeById(id)
  .then(data => {
    return res.json({
      data
    })
  })
  .catch(err => {
    console.log(err)
    return res.status(401).json({
        message: "Some error occurred"
    })  
  })

};

const addToGenderDb = async (req, res) => {
  const{type, imgUrl} = req.body
  await genderTypeQuery.addTypeToGendersDb(
   type,
   imgUrl
  ).catch(err=> {
    console.log(err)
    return res.status(401).json({
      message: "Some Error Occurred"
    })
  })

  return res.json({
    status: "Success"
  })

};


module.exports = {
  getAllGenderTypes,
  addToGenderDb,
  getGenderTypeById
};
