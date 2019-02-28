const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Grievance = require("./grievance");
const User = require("./user");

const GrievanceLog = sequelize.define("grievancelog", {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  log: {
    type: Sequelize.STRING(2000),
    allowNull: false
  }
});

GrievanceLog.belongsTo(Grievance);
GrievanceLog.belongsTo(User);

module.exports = GrievanceLog;
