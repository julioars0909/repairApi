const User = require("../models/users.model");
const CatchAsync = require("../utils/CatchAsync");
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/jwt");
const AppError = require("../utils/AppError");

exports.createUser = CatchAsync(async(req, res, next) => {
  const {name, email, password, role} = req.body;

  //1. crear una instancia de la clase user 
  const user = new User({
    name,
    email,
    password,
    role
  })

  //2. encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  //3.Guardar en la base de datos con la contrasenia encriptada
  await user.save();

  //4.generar el jwt
const token = await generateJWT(user.id);


  return res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,

    }
  });


});

exports.login = CatchAsync(async (req, res, next) => {

  const {email, password} = req.body;

  //1.verificar si existe el usuario y verificar si la contraseña es correcta
  const user = await User.findOne({
    where: {
      email,
      status: 'available',
    },
  });

  if(!user){
    return next(new AppError('The user could not be found', 404))
  }

  if(!(await bcrypt.compare(password, user.password))){
    return next(new AppError('Incorrect email or password', 401))
  }

  //2. si todo esta bien, enviar un token al cliente
  const token = await generateJWT(user.id);
  
  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      user: user.email,
      role: user.role,
    }
  });

});
