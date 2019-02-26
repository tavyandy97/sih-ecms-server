const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const SubCategory = require("./subcategory");
const User = require("./user");

const Grievance = sequelize.define("grievance", {
  grievanceid: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  subject: {
    type: Sequelize.STRING(2000),
    allowNull: false
  },
  isClosed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  closedBy: {
    type: Sequelize.STRING(1),
    allowNull: true,
    validate: {
      isRole(value) {
        newVal = value.toUpperCase();
        if (!(newVal === "P" || newVal === "C"))
          throw new Error(`Only \'P\', \'C\' values are allowed!`);
      }
    },
    set(val) {
      this.setDataValue("status", val.toUpperCase());
    }
  },
  status: {
    type: Sequelize.STRING(1),
    validate: {
      isRole(value) {
        newVal = value.toUpperCase();
        if (
          !(
            newVal == "O" ||
            newVal === "P" ||
            newVal === "F" ||
            newVal === "C" ||
            newVal === "A"
          )
        )
          throw new Error(
            `Only \'O\', \'P\', \'F\', \'C\', \'A\' values are allowed!`
          );
      }
    },
    set(val) {
      this.setDataValue("status", val.toUpperCase());
    }
  },
  timeTillEscalation: {
    type: Sequelize.BIGINT,
    allowNull: false
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
  },
  subcategoryid: {
    type: Sequelize.BIGINT,
    references: {
      model: SubCategory,
      key: "subcategoryid"
    }
  },
  userid: {
    type: Sequelize.BIGINT,
    references: {
      model: User,
      key: "userid"
    }
  }
});

module.exports = Grievance;
