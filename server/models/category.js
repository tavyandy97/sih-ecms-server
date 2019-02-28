const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Category = sequelize.define("category", {
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

module.exports = Category;
