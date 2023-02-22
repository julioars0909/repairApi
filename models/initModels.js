const Repair = require("./repairs.models");
const User = require("./users.model");


const initModel = () => {
  
  User.hasMany(Repair); //1 usuario puede tener muchas reparaciones
  Repair.belongsTo(User); // Esas reparaciones pertenecen a un usuario
  
};

module.exports = initModel;