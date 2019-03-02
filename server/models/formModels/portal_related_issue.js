const { db } = require("../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const SubCategory = require("../subcategory");

const Portal_related_issue = sequelize.define("portal_related_issue", {
  grievence_subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  area_screen_of_error: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isSOE(value) {
        newVal = value;
        if (
          !(
            newVal === "DashBoard" || //D=dashboard,H=homescreen,L=loginpage
            newVal === "Login" ||
            newVal === "Home"
          )
        )
          throw new Error(
            `Only \'DashBoard\', \'Login\', \'Home\' values are allowed!`
          );
      }
    }
    // set(val) {
    //   this.setDataValue("screen_of_Error", val.toUpperCase());
    // }
  },
  degree_of_error: {
    type: Sequelize.STRING(1),
    allowNull: false,
    validate: {
      isDOE(value) {
        newVal = value;
        if (
          !(
            newVal == "Low" || //L=Low,H=High,M=Moderate
            newVal === "Moderate" ||
            newVal === "High"
          )
        )
          throw new Error(
            `Only \'Low\', \'Moderate\', \'High\' values are allowed!`
          );
      }
    }
    // set(val) {
    //   this.setDataValue("degree_of_error", val.toUpperCase());
    // }
  },
  grievance_description: {
    type: Sequelize.TEXT,
    allowNUll: false
  },
  attached_documents: {
    type: Sequelize.STRING,
    aloowNull: false
  },
  time1: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  time2: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  time3: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  timeOF: {
    type: Sequelize.BIGINT,
    allowNull: false
  }
});
Portal_related_issue.belongsTo(SubCategory);

module.exports = Portal_related_issue;
