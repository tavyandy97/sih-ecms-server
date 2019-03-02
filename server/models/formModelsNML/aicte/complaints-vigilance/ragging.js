const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Ragging = sequelize.define("ragging", {
  grievance_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  grievence_subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  accused_names: {
    type: Sequlize.STRING,
    allowNull: false
  },
  nearest_vigilance_enforcer: {
    type: Sequlize.STRING,
    allowNull: false
  },
  place: {
    type: Sequlize.STRING,
    allowNull: false
  },
  time: {
    type: Sequlize.STRING,
    allowNull: false
  },
  victim_id: {
    type: Sequlize.STRING,
    allowNull: false
  },
  victim_names: {
    type: Sequlize.STRING,
    allowNull: false
  },
  attached_documents: {
    type: Sequlize.STRING,
    allowNull: false
  }
});
Ragging.belongsTo(SubCategory);
module.exports = Ragging;
