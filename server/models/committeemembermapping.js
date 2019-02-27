const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Category = require("./category");
const User = require("./user");

const CommitteeMemberMapping = sequelize.define("committeemembermapping", {
  committeemembermappingid: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  categoryid: {
    type: Sequelize.BIGINT,
    unique: true,
    references: {
      model: Category,
      key: "categoryid"
    }
  },
  userid: {
    type: Sequelize.BIGINT,
    unique: true,
    references: {
      model: User,
      key: "userid"
    }
  }
});

module.exports = CommitteeMemberMapping;
