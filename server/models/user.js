const Category = require("./category");

const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { db } = require("../db/connect");
sequelize = db.sequelize;
Sequelize = db.Sequelize;
const User = sequelize.define("user", {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(val, salt);
      this.setDataValue("password", hash);
    }
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  isStudent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  phone: {
    type: Sequelize.BIGINT(10),
    allowNull: false
  },
  sex: {
    type: Sequelize.STRING(1),
    allowNull: false,
    validate: {
      isSex(value) {
        newVal = value.toUpperCase();
        if (!(newVal === "M" || newVal === "O" || newVal === "F"))
          throw new Error(`Only \'M\', \'F\', \'O\' values are allowed!`);
      }
    },
    set(val) {
      this.setDataValue("sex", val.toUpperCase());
    }
  },
  role: {
    type: Sequelize.STRING(1),
    allowNull: false,
    validate: {
      isRole(value) {
        newVal = value.toUpperCase();
        if (
          !(
            newVal == "S" ||
            newVal === "F" ||
            newVal === "C" ||
            newVal === "P" ||
            newVal === "O" ||
            newVal === "A"
          )
        )
          throw new Error(
            `Only \'S\', \'F\', \'C\', \'P\', \'O\', \'A\' values are allowed!`
          );
      }
    },
    set(val) {
      this.setDataValue("role", val.toUpperCase());
    }
  }
});

User.belongsTo(Category);

User.prototype.generateAuthToken = function() {
  var user = this;
  var access = "auth";
  var token = jwt
    .sign({ id: user.id, access, role: user.role }, process.env.SECRET, {
      expiresIn: 1000 * 60 * 60 * 24
    })
    .toString();
  return user.save().then(() => {
    return token;
  });
};

User.findByCredentials = function(id, password) {
  var User = this;
  return User.findOne({ where: { id } }).then(user => {
    if (!user || _.isUndefined(user)) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject(err);
        }
      });
    });
  });
};

module.exports = User;
