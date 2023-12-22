// Import model History
const History = require('./History.js');

// Inisialisasi Sequelize
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

// Definisi model Sign
const Sign = sequelize.define('Sign', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


module.exports = Sign;