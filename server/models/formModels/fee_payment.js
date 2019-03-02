const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const fee_payment = sequelize.define("fee_payment", {
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
    min: 900000000000,
    max: 999999999999,
    allowNull: false
  },

  current_status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isStatus(value) {
        if (
          !(value === "Processed" || value === "Pending" || value === "Failed")
        ) {
          throw new Error(`Only Processed, Pending, Failed allowed`);
        }
      }
    }
  },
  transaction_number: {
    type: Sequelize.INTEGER,
    min: 1000000000,
    max: 1999999999,
    allowNull: false
  },
  date_of_transaction: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  mode_of_transaction: {
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
      this.setDataValue("mode_of_transaction", val.toUpperCase());
    }
  },
  attached_documents: {
    type: Sequelize.STRING,
    allowNull: false
  },
  days_response: {
    type: INTEGER,
    allowNull: false
  }
});
fee_payment.belongsTo(SubCategory);
module.exports = fee_payment;
