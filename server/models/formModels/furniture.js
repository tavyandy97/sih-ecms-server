const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const furniture = sequelize.define("furniture", {
  grievance_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  grievence_subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  partsneeded: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isBank(value) {
        newVal = value;
        if (
          !(
            newVal === "Bed" ||
            newVal === "Chair" ||
            newVal === "Cupboard board" ||
            newVal === "shelf" ||
            newVal === "Tables"
          )
        ) {
          throw new Error(
            `Only values \'Bed\' || \'Chair\' || \'Tables\' || \'shelf\'|| \'Cupboard board\' are conidered`
          );
        }
      }
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
furniture.belongsTo(SubCategory);
module.exports = furniture;
