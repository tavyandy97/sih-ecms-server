const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Against_institute = sequelize.define("against_institute", {
  grievance_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  grievence_subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  attached_documents: {
    type: Sequlize.STRING,
    allowNull: false
  }
});
Against_institute.belongsTo(SubCategory);
module.exports = Against_institute;
