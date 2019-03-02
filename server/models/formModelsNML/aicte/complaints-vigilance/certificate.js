const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Certificate = sequelize.define("certificate", {
  grievance_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  grievence_subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  current_status: {
    type: Sequlize.STRING,
    allowNull: false
  },
  complaint_expected_status: {
    type: Sequlize.STRING,
    allowNull: false
  },
  certificate_central_to_grievance: {
    type: Sequlize.STRING,
    allowNull: false
  },
  attached_documents: {
    type: Sequlize.STRING,
    allowNull: false
  }
});
Certificate.belongsTo(SubCategory);
module.exports = Certificate;
