const { Drivers } = require('./driver');
const { Orders } = require('./order');
const { CompaniesA } = require('./companiesA');
const { Staff } = require('./staff');
const { StatusOrder } = require('./statusOrder');

Orders.belongsTo(Staff, { foreignKey: 'managerId', as: 'staff' });
Orders.belongsTo(CompaniesA, { foreignKey: 'deliveryPointA', as: 'a' });
Orders.belongsTo(CompaniesA, { foreignKey: 'deliveryPointB', as: 'b' });
Orders.belongsTo(Drivers, { foreignKey: 'driverId', as: 'driver' });
Orders.belongsTo(StatusOrder, { foreignKey: 'status', as: 'statusorder' });

Staff.hasMany(Orders, { foreignKey: 'managerId', as: 'orders' });
Drivers.hasMany(Orders, { foreignKey: 'driverId', as: 'orders' });
CompaniesA.hasMany(Orders, { foreignKey: 'deliveryPointA', as: 'ordersa' });
CompaniesA.hasMany(Orders, { foreignKey: 'deliveryPointB', as: 'ordersb' });
StatusOrder.hasMany(Orders, { foreignKey: 'status', as: 'orders' });

module.exports = {
  Drivers,
  Orders,
  CompaniesA,
  Staff,
  StatusOrder,
};
