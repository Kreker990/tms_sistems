const { DataTypes } = require('sequelize');
const db = require('../../../db');

const Drivers = db.sequelize.define('Drivers', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  carNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  busy: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  hashedPassword: {
    type: DataTypes.BLOB,
  },
  salt: {
    type: DataTypes.BLOB,
  },
});

module.exports = {
  Drivers,
};
