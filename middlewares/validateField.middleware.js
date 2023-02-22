const { validationResult } = require("express-validator");

exports.validateField = (req, res, next) => {
  const errors = validationResult(req); //Esto ees un arreglo de errores

  if(!errors.isEmpty()){
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped() //Es para que los errores aparezcan en forma de lista y me los mapee, o sea los coloque 1 por 1
    });
  }
  next()
};