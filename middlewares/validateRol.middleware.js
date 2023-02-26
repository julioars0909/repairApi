const User = require("../models/users.model");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");
const {promisify} = require('util');
const jwt = require('jsonwebtoken');

exports.validateRol = CatchAsync(async(req, res, next) => {

  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT_SEED)


  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
      role: 'employee'
    }
  });

  if(!user){
    return next(new AppError('Unauthorized user', 401))
  };

  next()
});