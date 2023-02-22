const { Router } = require('express');
const { check } = require('express-validator');
const { findAllRepairs, findOneRepair, createRepair, updateRepair, deleteRepair } = require('../controllers/repair.controller');
const { validateRepairPending } = require('../middlewares/repair.middleware');
const { validateField } = require('../middlewares/validateField.middleware');
const router = Router();

router.get('/', findAllRepairs);

router.get('/:id',validateRepairPending, findOneRepair);

router.post('/', [
  check('date', 'The date must be mandatory').not().isEmpty(),
  check('motorsNumber', 'The motorsNumber most be mandatory').not().isEmpty(),
  check('description', 'The description most be mandatory').not().isEmpty(),
],validateField, createRepair);

router.patch('/:id',validateRepairPending, updateRepair);

router.delete('/:id',validateRepairPending, deleteRepair);

module.exports = {
  repairRouter: router,
};