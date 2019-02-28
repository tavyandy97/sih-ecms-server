const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Category = require("./category");

const SubCategory = sequelize.define("subcategory", {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  subcategory: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

SubCategory.belongsTo(Category);

module.exports = SubCategory;
