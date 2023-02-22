const User = require("../models/users.model");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync")

exports.validateExistUser = CatchAsync(async (req, res, next) => {
  
  const {id} = req.params;
  
  const findUser = await User.findOne({
    where: {
      id,
      status: 'available'
    }
  });

  if(!findUser){
    return next(new AppError('user not found',404))
  };
  
  req.findUser = findUser;

  next()
}
) 