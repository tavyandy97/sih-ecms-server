const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const wifi = sequelize.define("wifi", {
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
        if (
          !(value === "Speed" || value === "Range" || value === "Connectivity")
        ) {
          throw new Error(
            `Only Speed or Range or Connectivity values accepted`
          );
        }
      }
    }
  },
  //WIFRouter,Bandwidth,Ports,Lan Wire
  problemarea: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isStatus(value) {
        newVal = value.toUpperCase();
        if (
          !(
            value === "WIFRouter" ||
            value === "Bandwidth" ||
            value === "Ports" ||
            value === "Lan Wire"
          )
        ) {
          throw new Error(
            `Only WIFRouter or Bandwidth or Ports or Lan Wire values accepted`
          );
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
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },

  needforreplacement: {
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
wifi.belongsTo(SubCategory);
module.exports = `wifi`;
