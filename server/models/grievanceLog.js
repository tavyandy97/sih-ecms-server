const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Grievance = require("./grievance");
const User = require("./user");

const GrievanceLog = sequelize.define("grievancelog", {
  grievancelogid: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  log: {
    type: Sequelize.STRING(2000),
    allowNull: false
  },
  grievanceid: {
    type: Sequelize.BIGINT,
    references: {
      model: Grievance,
      key: "grievanceid"
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

module.exports = GrievanceLog;
