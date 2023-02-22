const Repair = require("../models/repairs.models");
const CatchAsync = require("../utils/CatchAsync");

exports.validateRepairPending = CatchAsync( async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      status: 'pending',
      id,
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'Repair not found',
    });
  };

req.repair = repair;

  next();
});