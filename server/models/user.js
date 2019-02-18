const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const {sequelize} = require('../db/connect');
const User = sequelize.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(30),
    allowNull:false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull:false,
    set(val) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(val, salt);
      this.setDataValue('password', hash);
    }
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull:false,
    validate: {
      isDate: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull:false,
    validate: {
      isEmail: true
    }
  },
  isStudent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  phone: {
    type: Sequelize.BIGINT(10),
    allowNull:false
  },
  sex: {
    type: Sequelize.STRING(1),
    allowNull:false,
    validate: {
      isSex(value){
        newVal = value.toUpperCase();
        if( !(newVal === 'M' || newVal === 'O' || newVal === 'F'))
          throw new Error(`Only \'M\', \'F\', \'O\' values are allowed!`)
      }
    },
    set(val) {
      this.setDataValue('sex', val.toUpperCase());
    }
  },
  role: {
    type: Sequelize.STRING(1),
    allowNull:false,
    validate: {
      isRole(value){
        newVal = value.toUpperCase();
        if( !(newVal == 'S' || newVal === 'F' || newVal === 'C' || newVal === 'P' || newVal === 'O' || newVal === 'A'))
          throw new Error(`Only \'S\', \'F\', \'C\', \'P\', \'O\', \'A\' values are allowed!`)
      }
    },
    set(val) {
      this.setDataValue('role', val.toUpperCase());
    }
  }
}, {
  validate: {
    isStudentOnly(){
      if(this.isStudent && this.role !== 'S'){
        throw new Error('The user is not an end user, hence cannot have status of student!');
      }
    }
  }
});

module.exports = {
  User
};
