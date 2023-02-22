const Repair = require('../models/repairs.models');
const CatchAsync = require('../utils/CatchAsync');

exports.findAllRepairs = CatchAsync( async (req, res, next) => {
  
  const repairs = await Repair.findAll({
    attributes: ['id', 'date', 'userId'],
    where: {
      status: 'pending',
    },
  });

  return res.status(200).json({
    status: 'success',
    repairs,
  });

});

exports.findOneRepair = CatchAsync(async (req, res, next) => {
  
  const {repair} = req;

  return res.status(200).json({
    status: 'success',
    repair,
  });

});


exports.createRepair = CatchAsync(async (req, res, next) => {
  
  const { date, userId, description, motorsNumber } = req.body;

  const repair = await Repair.create({ date, userId, description, motorsNumber });

  return res.status(201).json({
    status: 'success',
    message: 'Created Repair',
    repair,
  });

});
exports.updateRepair = CatchAsync(async (req, res, next) => {

  
  const { status } = req.body;
  const {repair} = req;


  await repair.update({ status });

  return res.status(200).json({
    status: 'success',
  });

});

exports.deleteRepair = CatchAsync(async (req, res, next) => {
  
  const {repair} = req;

  await repair.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
  });

});