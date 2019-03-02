const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Right_to_information = sequelize.define("right_to_information", {
  grievance_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  grievence_subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  specifications_of_information_needed: {
    type: Sequlize.STRING,
    allowNull: false
  },
  reason_of_need_for_rti: {
    type: Sequlize.STRING,
    allowNull: false
  },
  attached_documents: {
    type: Sequlize.STRING,
    allowNull: false
  }
});
Right_to_information.belongsTo(SubCategory);
module.exports = Right_to_information;
