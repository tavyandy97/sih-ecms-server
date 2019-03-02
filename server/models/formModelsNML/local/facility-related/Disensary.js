const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Dispenary = sequelize.define("dispensary", {
  grievance_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  grievence_subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  issue: {
    type: Sequelize.STRING,
    allowNull: false
  },
  attached_documents: {
    type: Sequlize.STRING,
    allowNull: false
  }
});
Dispenary.belongsTo(SubCategory);
module.exports = Dispenary;
