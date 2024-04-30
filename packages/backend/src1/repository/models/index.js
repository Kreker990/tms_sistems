const { Drivers } = require('./driver');
const { Orders } = require('./order');
const { CompaniesA } = require('./companiesA');
const { CompaniesB } = require('./companiesB');
const { Staff } = require('./staff');
const { StatusOrder } = require('./statusOrder');

Orders.belongsTo(Staff, { foreignKey: 'staffId', as: 'staff' });
Orders.belongsTo(CompaniesA, { foreignKey: 'staffId', as: 'a' });
Orders.belongsTo(CompaniesB, { foreignKey: 'staffId', as: 'b' });
Orders.belongsTo(Drivers, { foreignKey: 'driverId', as: 'driver' });
Orders.belongsTo(StatusOrder, { foreignKey: 'driverId', as: 'statusorder' });

Staff.hasMany(Orders, { foreignKey: 'staffId', as: 'orders' });
Drivers.hasMany(Orders, { foreignKey: 'driverId', as: 'orders' });
CompaniesA.hasMany(Orders, { foreignKey: 'driverId', as: 'orders' });
CompaniesB.hasMany(Orders, { foreignKey: 'driverId', as: 'orders' });
StatusOrder.hasMany(Orders, { foreignKey: 'driverId', as: 'orders' });

module.exports = {
  Drivers,
  Orders,
  CompaniesA,
  CompaniesB,
  Staff,
  StatusOrder,
};
