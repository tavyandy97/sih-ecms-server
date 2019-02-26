const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Category = require("./category");

const SubCategory = sequelize.define("subcategory", {
  subcategoryid: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  subcategory: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  categoryid: {
    type: Sequelize.BIGINT,
    references: {
      model: Category,
      key: "categoryid"
    }
  }
});

module.exports = SubCategory;
