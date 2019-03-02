const { db } = require("../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const SubCategory = require("../subcategory");

const Watersupply = sequelize.define("watersupply", {
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
        if (!(value === "Drinking" || value === "Supply")) {
          throw new Error(`Only Drinking or Supply values accepted`);
        }
      }
    }
  },
  partsneeded: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isBank(value) {
        newVal = value;
        if (!(newVal === "Tap" || newVal === "Pipe" || newVal === "Bassers")) {
          throw new Error(
            `Only values \'Tap\' || \'Pipe\' || \'Bassers\' are conidered`
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
Watersupply.belongsTo(SubCategory);
module.exports = Watersupply;
