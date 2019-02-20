const Sequelize = require("sequelize");

const { sequelize } = require("../db/connect");
const OnFieldMapping = sequelize.define("onfieldmapping", {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  categoryid: {
    type: Sequelize.BIGINT,
    references: {
      model: Category,
      key: "id"
    }
  },
  userid: {
    type: Sequelize.BIGINT,
    references: {
      model: User,
      key: "id"
    }
  }
});

module.exports = {
  OnFieldMapping
};
