const Sequelize = require("sequelize");

const { sequelize } = require("../db/connect");
const Grievance = sequelize.define("grievance", {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  subject: {
    type: Sequelize.STRING(2000),
    allowNull: false
  },
  descriiption: {
    type: Sequelize.STRING(2000),
    allowNull: false
  },
  hasFieldAnalysis: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: Sequelize.STRING(1),
    validate: {
      isRole(value) {
        newVal = value.toUpperCase();
        if (
          !(newVal == "O" || newVal === "P" || newVal === "F" || newVal === "C")
        )
          throw new Error(
            `Only \'O\', \'P\', \'F\', \'C\' values are allowed!`
          );
      }
    },
    set(val) {
      this.setDataValue("status", val.toUpperCase());
    }
  },
  time1: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  time2: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  time3: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  timeOF: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  subcategoryid: {
    type: Sequelize.BIGINT,
    references: {
      model: SubCategory,
      key: "id"
    }
  },
  userid: {
    type: Sequelize.BIGINT,
    references: {
      model: User,
      key: "id"
    }
  }
});

module.exports = {
  Grievance
};
