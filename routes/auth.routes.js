const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login } = require("../controllers/auth.controller");

const { validateField } = require("../middlewares/validateField.middleware");

const router = Router();

router.post('/signup', [
  check('name', 'The name must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
], validateField, createUser
);

router.post('/login',[
  check('email', 'The email must be a correct format').isEmail(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('password', 'The password must be mandatory').not().isEmpty(), 
],validateField, login

)

module.exports = {
  authRouter: router, 
} 