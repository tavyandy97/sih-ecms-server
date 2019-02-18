const Sequelize = require('sequelize');

const {sequelize} = require('../db/connect');
const SubCategory = sequelize.define('subcategory', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  subcategory: {
    type: Sequelize.STRING(50),
    allowNull:false
  },
  categoryid: {
    type: Sequelize.BIGINT,
    references: {
      model: Category,
      key: 'id',
    }
  }
});



module.exports = {
  SubCategory
};
