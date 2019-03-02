const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Mess_staff = sequelize.define("mess_staff", {
  grievance_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  grievence_subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dutytime: {
    type: Sequelize.STRING,
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
  attached_documents: {
    type: Sequlize.STRING,
    allowNull: false
  }
});
Mess_staff.belongsTo(SubCategory);
module.exports = Mess_staff;
