const { Router } = require('express');

const {
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers');
const { protect, protectAccountOwner } = require('../middlewares/Auth.middleware');
const { validateExistUser } = require('../middlewares/user.middleware');


const router = Router();

router.get('/',protect, findAllUsers);

router.get('/:id',protect, validateExistUser, findOneUser);


//cambiar el protect en caso de errores
router.patch('/:id',protect, validateExistUser,protectAccountOwner,  updateUser);

router.delete('/:id',protect, validateExistUser,protectAccountOwner, deleteUser);

module.exports = {
  userRouter: router,
};