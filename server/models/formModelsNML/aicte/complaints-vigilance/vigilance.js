const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Vigilance = sequelize.define("vigilance", {
  grievance_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  grievence_subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  grivance_against: {
    type: Sequlize.STRING,
    allowNull: false
  },
  policy_ID: {
    type: Sequlize.STRING,
    allowNull: false
  },
  official_name: {
    type: Sequlize.STRING,
    allowNull: false
  },
  attached_documents: {
    type: Sequlize.STRING,
    allowNull: false
  }
});
Vigilance.belongsTo(SubCategory);
module.exports = Vigilance;
