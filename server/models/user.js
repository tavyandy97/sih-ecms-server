const Sequelize = require('sequelize');

const {sequelize} = require('../db/connect');
const User = sequelize.define('user', {
  id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(30),
    validate: {
      notNull: true
    }
  },
  dob: {
    type: Sequelize.DATEONLY,
    validate: {
      notNull: true,
      isDate: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
      isEmail: true
    }
  },
  isStudent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  phone: {
    type: Sequelize.BIGINT(10),
    validate: {
      notNull: true
    }
  },
  sex: {
    type: Sequelize.STRING(1),
    validate: {
      isSex(value){
        newVal = value.toUpperCase();
        if( !(value === 'M' || value === 'O' || value === 'F'))
          throw new Error(`Only \'M\', \'F\', \'O\' values are allowed!`)
      }
    },
    set(val) {
      this.setDataValue('sex', val.toUpperCase());
    }
  },
  role: {
    type: Sequelize.STRING(1),
    validate: {
      isSex(value){
        newVal = value.toUpperCase();
        if( !(value == 'S' || value === 'F' || value === 'C' || value === 'P' || value === 'O' || value === 'A'))
          throw new Error(`Only \'S\', \'F\', \'C\', \'P\', \'O\', \'A\' values are allowed!`)
      }
    },
    set(val) {
      this.setDataValue('role', val.toUpperCase());
    }
  }
});

module.exports = {
  User
};
