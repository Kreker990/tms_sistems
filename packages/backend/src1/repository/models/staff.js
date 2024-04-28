const { DataTypes } = require('sequelize');
const db = require('../../../db');

const Staff = db.sequelize.define('Staff', {
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
  mail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = {
  Staff,
};
