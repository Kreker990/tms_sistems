const { DataTypes } = require('sequelize');
const db = require('../../../db');

const Orders = db.sequelize.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  deliveryPointA: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deliveryPointB: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  driverId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
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
    type: DataTypes.STRING,
    allowNull: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = {
  Orders,
};
