const User = require("../models/users.model");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");

exports.findAllUsers = CatchAsync(async(req, res, next) => {
  

  const findUsers = await User.findAll({
    where: {
      status: 'available'
    }
  });
  
    return  res.status(200).json({
        status: 'success',
        message: 'Users was found successfully',
        findUsers,
      })
    
  });

exports.findOneUser = CatchAsync(async(req, res, next) => {
  
const {findUser} = req;
 
    return  res.status(200).json({
        status: 'success',
        message: 'The user was found successfully',
        findUser,
      })
    
  }); 

exports.createUser = CatchAsync(async(req, res, next) => {
  const {name, email, password, role} = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return res.status(200).json({
    status: 'success',
    message: 'User created',
    user,
  })


});

exports.updateUser = CatchAsync(async(req, res, next) => {
  
  const {findUser} = req;
  const {name, password} = req.body;


await findUser.update({name, password})

return  res.status(200).json({
    status: 'success',
    message: 'User was update successfully',
    findUser,

  })

});

exports.deleteUser = CatchAsync(async(req, res, next) => {

  const {findUser} = req;
  
    await findUser.update({status: 'disabled'})
  
    return   res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
        
      })
    
  });
