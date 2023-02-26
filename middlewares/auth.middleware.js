const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const User = require("../models/users.model");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");

exports.protect = CatchAsync(async(req, res, next) => {

  //1. Verificar que el token llegue
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }
  if(!token){
    return next(new AppError('You are not logged in! Please log in to get access', 401))
  } 

  //2. Verificar el token 
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT_SEED)

  //3. Verificar que el usuario exista 
  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available'
    }
  });

  if(!user){
    return next(new AppError('The owner of this token is not longer available', 401))
  }

  //4. verificar si el usuario Ha cambiado la contrasenia despues de que el token haya expirado

next();
});