const { Drivers } = require('./driver');
const { Orders } = require('./order');
const { CompaniesA } = require('./companiesA');
const { CompaniesB } = require('./companiesB');
const { Staff } = require('./staff');
const { StatusOrder } = require('./statusOrder');

Orders.belongsTo(Staff, { foreignKey: 'managerId', as: 'staff' });
Orders.belongsTo(CompaniesA, { foreignKey: 'deliveryPointA', as: 'a' });
Orders.belongsTo(CompaniesB, { foreignKey: 'deliveryPointB', as: 'b' });
Orders.belongsTo(Drivers, { foreignKey: 'driverId', as: 'driver' });
Orders.belongsTo(StatusOrder, { foreignKey: 'status', as: 'statusorder' });

Staff.hasMany(Orders, { foreignKey: 'staffId', as: 'orders' });
Drivers.hasMany(Orders, { foreignKey: 'driverId', as: 'orders' });
CompaniesA.hasMany(Orders, { foreignKey: 'deliveryPointA', as: 'orders' });
CompaniesB.hasMany(Orders, { foreignKey: 'deliveryPointB', as: 'orders' });
StatusOrder.hasMany(Orders, { foreignKey: 'status', as: 'orders' });

module.exports = {
  Drivers,
  Orders,
  CompaniesA,
  CompaniesB,
  Staff,
  StatusOrder,
};
