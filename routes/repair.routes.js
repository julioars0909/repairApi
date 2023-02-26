const { Router } = require('express');
const { check } = require('express-validator');
const { findAllRepairs, findOneRepair, createRepair, updateRepair, deleteRepair } = require('../controllers/repair.controller');
const { protect } = require('../middlewares/Auth.middleware');
const { validateRepairPending } = require('../middlewares/repair.middleware');
const { validateField } = require('../middlewares/validateField.middleware');
const { validateRol } = require('../middlewares/validateRol.middleware');
const router = Router();

router.get('/',protect,validateRol, findAllRepairs);

router.get('/:id',protect,validateRol, validateRepairPending, findOneRepair);

router.post('/',protect, [
  check('date', 'The date must be mandatory').not().isEmpty(),
  check('motorsNumber', 'The motorsNumber most be mandatory').not().isEmpty(),
  check('description', 'The description most be mandatory').not().isEmpty(),
],validateField, createRepair);

router.patch('/:id',protect,validateRol, validateRepairPending, updateRepair);

router.delete('/:id',protect,validateRol, validateRepairPending, deleteRepair);

module.exports = {
  repairRouter: router,
};