const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Other = sequelize.define("other", {
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
Other.belongsTo(SubCategory);
module.exports = Other;
