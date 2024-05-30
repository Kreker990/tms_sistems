const { DataTypes } = require('sequelize');
const db = require('../../../db');
const { CompaniesA } = require('./companiesA');
const { Drivers } = require('./driver');
const { StatusOrder } = require('./statusOrder');
const { Staff } = require('./staff');

const Orders = db.sequelize.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  deliveryPointA: {
    type: DataTypes.INTEGER,
    references: {
      model: CompaniesA,
      key: 'id',
    },
  },
  deliveryPointB: {
    type: DataTypes.INTEGER,
    references: {
      model: CompaniesA,
      key: 'id',
    },
  },
  driverId: {
    type: DataTypes.INTEGER,
    references: {
      model: Drivers,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.INTEGER,
    references: {
      model: StatusOrder,
      key: 'id',
    },
  },
  timeStart: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timeEnd: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  managerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Staff,
      key: 'id',
    },
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = {
  Orders,
};
