const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Eligibility = sequelize.define("Eligibility", {
  grievance_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  grievence_subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  current_marks: {
    type: Sequelize.INTEGER,
    min: 0,
    max: 10,
    allowNull: false
  },
  applied_course: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isCourse(value) {
        newVal = value.toUpperCase();
        if (
          !(
            newVal === "COE" ||
            newVal === "MEE" ||
            newVal === "ELEC" ||
            newVal === "BIOTECH" ||
            newVal === "CIVIL" ||
            newVal === "CHEM" ||
            newVal === "ECE" ||
            newVal === "ENC"
          )
        ) {
          throw new Error(
            `Only COE, MEE, ELEC, BIOTECH, CIVIL, CHEM, ECE, ENC values allowed`
          );
        }
      }
    },
    set(val) {
      this.setDataValue("applied_course", val.toUpperCase());
    }
  },
  priority_category: {
    type: Sequelize.INTEGER,
    min: 1,
    max: 4,
    allowNull: false
  },
  attached_documents: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
Against_institute.belongsTo(SubCategory);
module.exports = Against_institute;
