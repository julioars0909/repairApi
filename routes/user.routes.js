const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers');
const { validateExistUser } = require('../middlewares/user.middleware');
const { validateField } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id',validateExistUser, findOneUser);

router.post('/', [
  check('name', 'The name must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
], validateField, createUser
);

router.patch('/:id',validateExistUser, updateUser);

router.delete('/:id',validateExistUser, deleteUser);

module.exports = {
  userRouter: router,
};