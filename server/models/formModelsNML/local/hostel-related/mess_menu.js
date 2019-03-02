const { db } = require("../../../../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const Mess_menu = sequelize.define("Mess_menu", {
  grievance_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  grievence_subject: {
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
  data: {
    type: Sequlize.STRING,
    allowNull: false
  },
  week: {
    type: Sequlize.STRING,
    allowNull: false,
    validate: {
      //A,B,C,H,K,L,J,M,N,I,G,E,PG
      isStatus(newValue) {
        value = newValue.toUpperCase();
        if (
          !(
            value === "SUNDAY" ||
            value === "MONDAY" ||
            value === "TUESDAY" ||
            value === "WEDNESDAY" ||
            value === "THURSDAY" ||
            value === "FRIDAY" ||
            value === "SATURDAY"
          )
        ) {
          throw new Error(
            `Only SUNDAY,MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY`
          );
        }
      }
    },
    set(val) {
      this.setDataValue("week", val.toUpperCase());
    }
  },
  attached_documents: {
    type: Sequlize.STRING,
    allowNull: false
  }
});
Mess_menu.belongsTo(SubCategory);
module.exports = Mess_menu;
