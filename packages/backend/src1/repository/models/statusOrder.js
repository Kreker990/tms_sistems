const { DataTypes } = require('sequelize');
const db = require('../../../db');

const StatusOrder = db.sequelize.define('StatusOrder', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = {
  StatusOrder,
};
