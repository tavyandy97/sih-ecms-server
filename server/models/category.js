const Sequelize = require('sequelize');

const {sequelize} = require('../db/connect');
const Category = sequelize.define('category', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});



module.exports = {
  Category
};
