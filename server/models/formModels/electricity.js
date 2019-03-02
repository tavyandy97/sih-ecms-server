const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const electricity = sequelize.define("electricity", {
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
        newVal = value.toUpperCase();
        if (!(newVal === "ELECTRICITY" || newVal === "AC")) {
          throw new Error(`Only ELECTRICITY or AC values accepted`);
        }
      }
    },
    set(val) {
      this.setDataValue("electricity", val.toUpperCase());
    }
  },

  quantity: {
    type: Sequelize.INTEGER,
    min: 1,
    allowNull: false
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
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },

  externalexpert: {
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

  days_response: {
    type: INTEGER,
    allowNull: false
  }
});
electricity.belongsTo(SubCategory);
module.exports = electricity;
