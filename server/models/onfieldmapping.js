const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Category = require("./category");
const User = require("./user");

const OnFieldMapping = sequelize.define("onfieldmapping", {
  onfieldmappingid: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  categoryid: {
    type: Sequelize.BIGINT,
    references: {
      model: Category,
      key: "categoryid"
    }
  },
  userid: {
    type: Sequelize.BIGINT,
    references: {
      model: User,
      key: "userid"
    }
  }
});

module.exports = {
  OnFieldMapping
};