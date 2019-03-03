const { db } = require("../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const SubCategory = require("../subcategory");

const Messfee = sequelize.define("messfee", {
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
    type: Sequelize.BIGINT(12),
    min: 900000000000,
    max: 999999999999,
    allowNull: false
  },

  hostel: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      //A,B,C,H,K,L,J,M,N,I,G,E,PG
      isStatus(value) {
        if (
          !(
            value === "A" ||
            value === "B" ||
            value === "C" ||
            value === "H" ||
            value === "K" ||
            value === "L" ||
            value === "J" ||
            value === "M" ||
            value === "N" ||
            value === "I" ||
            value === "G" ||
            value === "E" ||
            value === "PG"
          )
        ) {
          throw new Error(`Only A,B,C,H,K,L,J,M,N,I,G,E,PG`);
        }
      }
    }
  },
  transaction_number: {
    type: Sequelize.BIGINT(10),
    min: 1000000000,
    max: 1999999999,
    allowNull: false
  },

  transactionmode: {
    type: Sequelize.STRING,
    // allowNull: false,
    require: true,
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
Messfee.belongsTo(SubCategory);
module.exports = Messfee;
