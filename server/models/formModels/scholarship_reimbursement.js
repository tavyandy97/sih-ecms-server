const { db } = require("../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const SubCategory = require("../subcategory");

const Scholarship_reimbursement = sequelize.define(
  "scholarship_reimbursement",
  {
    grievance_description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    grievence_subject: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bank: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isBank(value) {
          newVal = value.toUpperCase();
          if (!(newVal === "SBI" || newVal === "ICICI" || newVal === "HDFC")) {
            throw new Error(
              `Only values \'SBI\' || \'ICICI\' || \'HDFC\' are conidered`
            );
          }
        }
      },
      set(val) {
        this.setDataValue("bank", val.toUpperCase());
      }
    },
    account_number: {
      type: Sequelize.INTEGER,
      min: 1000000000000,
      max: 9999999999999,
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
    current_marks: {
      type: Sequelize.INTEGER,
      min: 0,
      max: 10,
      allowNull: false
    },

    scholarship_category: {
      type: Sequelize.INTEGER,
      min: 1,
      max: 4,
      allowNull: false
    },
    money_released: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        ismoney(value) {
          if (!(value === "No" || value === "Yes")) {
            throw new Error(`Only Yes or No value needed`);
          }
        }
      }
    },
    mode_of_transfer: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        ismode(value) {
          newVal = value.toUpperCase();
          if (
            !(
              newVal === "NEFT" ||
              newVal === "DD" ||
              newVal === "CHEQUE" ||
              newVal === "CHALLAN" ||
              newVal === "PAYTM"
            )
          ) {
            throw new Error(`Only NEFT, DD, CHEQUE, CHALLAN, PAYTM allowed`);
          }
        }
      },
      set(val) {
        this.setDataValue("mode_of_transfer", val.toUpperCase());
      }
    },
    attached_documents: {
      type: Sequelize.STRING,
      allowNull: false
    },
    year: {
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
    }
  }
);
Scholarship_reimbursement.belongsTo(SubCategory);
module.exports = Scholarship_reimbursement;
