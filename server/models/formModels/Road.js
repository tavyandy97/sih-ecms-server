const { db } = require("../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const SubCategory = require("../subcategory");

const Road = sequelize.define("road", {
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
    allowNull: false,
    validate: {
      isStatus(value) {
        if (!(value === "New Road" || value === "Road Repair")) {
          throw new Error(`Only New Road or Road Repair values accepted`);
        }
      }
    }
  },

  availability: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isStatus(value) {
        if (!(value === "Available" || value === "Need To Order")) {
          throw new Error(`Only Available or Need To Order values accepted`);
        }
      }
    }
  },

  machinery: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      ismode(value) {
        newVal = value;
        if (!(newVal === "Yes" || newVal === "No")) {
          throw new Error(`Only Yes or No are allowed`);
        }
      }
    }
  },
  manpowerrequired: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      ismode(value) {
        newVal = value;
        if (!(newVal === "Yes" || newVal === "No")) {
          throw new Error(`Only Yes or No are allowed`);
        }
      }
    }
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
Road.belongsTo(SubCategory);
module.exports = Road;
