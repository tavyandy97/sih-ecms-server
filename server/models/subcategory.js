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
    validate: {
      notNull: true
    }
  },
  categoryid: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: 'id',
    }
  }
});



module.exports = {
  SubCategory
};
