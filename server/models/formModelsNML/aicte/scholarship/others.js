const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Others = sequelize.define("others", {
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
Others.belongsTo(SubCategory);
module.exports = Others;
